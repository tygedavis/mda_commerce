#!/bin/bash
set -e

# Cleanup function to kill background jobs on exit
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null || true
}
trap cleanup EXIT

echo "Starting Development Stack..."

# 1. Start Cloud SQL Proxy
echo "[Proxy] Starting..."
cd backend
./cloud-sql-proxy --address 0.0.0.0 --port 5432 maggiedavisart:us-central1:art-gallery-db > /dev/null 2>&1 &
PROXY_PID=$!
cd ..

# Wait for proxy to be somewhat ready (simple sleep)
sleep 2

# 2. Start Backend
echo "[Backend] Starting..."
cd backend
cargo run &
BACKEND_PID=$!
cd ..

# 3. Start Frontend
echo "[Frontend] Starting..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for any process to exit
wait -n

# If we get here, one of the processes exited
echo "One of the services exited. Shutting down..."
