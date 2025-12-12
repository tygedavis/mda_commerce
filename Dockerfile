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
# Install system dependencies
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
RUN touch src/main.rs
RUN cargo build --release

# Stage 3: Runtime
FROM debian:bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -u 1001 appuser
USER appuser

# Copy backend binary (ownership change required for appuser)
COPY --from=backend-builder --chown=appuser:appuser /app/target/release/backend ./server

# Copy frontend static files
COPY --from=frontend-builder --chown=appuser:appuser /app/dist ./frontend/dist

ENV PORT=8080
EXPOSE 8080

CMD ["./server"]
