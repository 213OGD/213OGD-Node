#!/bin/sh
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yaml -f docker-compose-prod.yaml up --build