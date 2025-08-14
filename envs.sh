#!/usr/bin/env bash

# Load local development environment variables for this project.
# Usage: source ./envs.sh

# Backend (Express API)
export API_PORT=3010
export DB_HOST=final-project.c7664wagwykt.eu-central-1.rds.amazonaws.com
export DB_USER=admin
export DB_PASSWORD=qwe12345!
export DB_NAME=colman
# CORS: השאר לא מוגדר כדי לאפשר מכל מקור בזמן בדיקות (או הגדר רשימה מופרדת בפסיקים)
# export CORS_ORIGIN=http://localhost:3000,http://YOUR_FE_HOST:3000,http://YOUR_FE_HOST

# Frontend (CRA dev server)
export PORT=3000
# No need to set HOST unless הגדרת בעבר להגביל ללוקאל בלבד

# Frontend → API: בלי לקבע IP. משתמשים באותו host עם פורט ה-API.
export REACT_APP_API_PORT=3010
# לחלופין, אם יש דומיין/ALB: הגדר URL מלא ובטל את REACT_APP_API_PORT
# export REACT_APP_API_URL=https://your-domain-or-lb

echo "Environment loaded: API_PORT=${API_PORT}, PORT=${PORT}, REACT_APP_API_PORT=${REACT_APP_API_PORT}"


