#!/bin/sh
git fetch origin && git reset --hard origin/master && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yaml -f docker-compose-prod.yaml up --build -d
