# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: Build Backend
FROM rust:1.85-slim-bookworm AS backend-builder
WORKDIR /app
# Install system dependencies needed for building (e.g. pkg-config, unknown-linux-gnu linkers if needed)
# For sqlx offline mode or build time DB checking, we might need SQLX_OFFLINE=true if no DB is present.
# We'll assume SQLX_OFFLINE is needed or we skip it for now. 
# However, usually CI needs offline mode. Let's try to build simply first.
RUN apt-get update && apt-get install -y pkg-config libssl-dev

COPY backend/Cargo.* ./
# Create a dummy src/main.rs to build dependencies and cache them
RUN mkdir src && echo "fn main() {}" > src/main.rs
# Enable offline mode for sqlx to skip DB checks during build
ENV SQLX_OFFLINE=true
COPY backend/sqlx-data.json ./
RUN cargo build --release
RUN rm -rf src

COPY backend/src src
COPY backend/.env* ./
COPY backend/migrations migrations
# Re-build with actual source
# Note: touches to main.rs ensure rebuild
RUN touch src/main.rs
RUN cargo build --release

# Stage 3: Runtime
FROM debian:bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*

# Copy backend binary
COPY --from=backend-builder /app/target/release/backend ./server

# Copy frontend static files
# We assume the rust backend is configured to serve these from a 'dist' or 'public' dir.
# If not currently configured, we place them in 'frontend/dist' and expectation is the backend serves them.
COPY --from=frontend-builder /app/dist ./frontend/dist

ENV PORT=8080
EXPOSE 8080

CMD ["./server"]
