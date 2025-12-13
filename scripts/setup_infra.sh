#!/bin/bash
set -e

# Configuration
PROJECT_ID="maggiedavisart"
REGION="us-central1"
RUNTIME_SA_NAME="gallery-runtime"
DEPLOYER_SA_NAME="github-actions"

RUNTIME_SA_EMAIL="${RUNTIME_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
DEPLOYER_SA_EMAIL="${DEPLOYER_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "Setting up infrastructure permissions for Project: $PROJECT_ID"

# 1. Enable required APIs
# The deployment failed because these APIs were not accessible/enabled.
echo "Enabling APIs..."
gcloud services enable sqladmin.googleapis.com serviceusage.googleapis.com --project "$PROJECT_ID"

# 2. Create Runtime Service Account if it doesn't exist
echo "Checking Runtime Service Account..."
if ! gcloud iam service-accounts describe "$RUNTIME_SA_EMAIL" --project "$PROJECT_ID" > /dev/null 2>&1; then
    echo "Creating service account $RUNTIME_SA_EMAIL..."
    gcloud iam service-accounts create "$RUNTIME_SA_NAME" \
        --display-name="Runtime SA for Gallery App" \
        --project "$PROJECT_ID"
else
    echo "Service account $RUNTIME_SA_EMAIL already exists."
fi

# 3. Grant permissions to Runtime SA
# It needs to connect to Cloud SQL.
echo "Granting roles/cloudsql.client to $RUNTIME_SA_EMAIL..."
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$RUNTIME_SA_EMAIL" \
    --role="roles/cloudsql.client" \
    --condition=None

# It implies it might need log writer permissions too if not inherited.
echo "Granting roles/logging.logWriter to $RUNTIME_SA_EMAIL..."
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$RUNTIME_SA_EMAIL" \
    --role="roles/logging.logWriter" \
    --condition=None

# 4. Grant ActAs permission (iam.serviceAccountUser) to the Deployer SA on the Runtime SA
# This allows the GitHub Actions SA to deploy Cloud Run services that run as the Runtime SA.
echo "Granting roles/iam.serviceAccountUser to $DEPLOYER_SA_EMAIL on $RUNTIME_SA_EMAIL..."
gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SA_EMAIL" \
    --member="serviceAccount:$DEPLOYER_SA_EMAIL" \
    --role="roles/iam.serviceAccountUser" \
    --project "$PROJECT_ID" \
    --condition=None

echo "Infrastructure setup complete."
