# mda_commerce

E-commerce platform for Maggie Davis Art.

## Project Structure

- **frontend**: React + TypeScript application (Vite).
- **backend**: Rust API backend (Axum + SQLx).

## Getting Started

### Prerequisites

- **Node.js** (v20+)
- **Rust** (Latest Stable)
- **Docker** (for containerization)
- **Cloud SQL Proxy** (for connecting to the database)

### Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgres://user:password@127.0.0.1:5432/gallery
DB_PASSWORD=your_db_password
```

### Development

#### 1. Database Connection

You must run the Cloud SQL Proxy to connect to the Google Cloud SQL instance.
The proxy binary is located in `backend/cloud-sql-proxy`.

```bash
# In a separate terminal
cd backend
./cloud-sql-proxy --address 0.0.0.0 --port 5432 maggiedavisart:us-central1:art-gallery-db
```

#### 2. Backend

```bash
cd backend
cargo run
```

The backend runs on `http://127.0.0.1:3001`.

#### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.


### Consolidated Development

For convenience, you can run the Proxy, Backend, and Frontend in a single terminal:

```bash
./scripts/dev.sh
```

### Consolidated Testing (Docker)

To test the production build locally (mimicking Cloud Run), use Docker Compose.
**Requirement**: You must place `gcp-sa-key.json` in the root directory.

```bash
docker compose --env-file .env.docker up --build
```

### Database Schema Changes (SQLx Offline)

Because the Docker build runs without a database connection, it relies on `backend/sqlx-data.json` for type checking.
If you check `.env`, verify `DATABASE_URL` is correct, and run:
```bash
# Install CLI if needed
cargo install sqlx-cli --no-default-features --features postgres --locked

# Generate offline data
cd backend
cargo sqlx prepare --database-url=$(grep DATABASE_URL ../.env | cut -d '=' -f2)
```
This updates `sqlx-data.json`, which must be committed.

## Deployment (Staging)

The project is configured with a CI/CD pipeline using **GitHub Actions**.

- **Trigger**: Push to `staging` branch.
- **Environment**: Cloud Run (Service: `gallery-staging`).
- **Database**: Connects to `art-gallery-db` (Database: `gallery_staging`).
- **Authorization**: Uses a dedicated Service Account (`github-actions@maggiedavisart...`).