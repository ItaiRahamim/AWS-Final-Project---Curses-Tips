#!/usr/bin/env bash

# Backend (Express API)
export API_PORT=3010
export DB_HOST=final-project.c7664wagwykt.eu-central-1.rds.amazonaws.com
export DB_USER=admin
export DB_PASSWORD=qwe12345!
export DB_NAME=colman

# Frontend (CRA dev server)
export PORT=3000
export REACT_APP_API_PORT=3010

echo "Environment loaded: API_PORT=${API_PORT}, PORT=${PORT}"