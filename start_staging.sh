#!/bin/sh
git fetch origin && git reset --hard origin/staging && git clean -f -d
cd auth && touch .npmrc && echo "
//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN
@mohakhlf:registry=https://npm.pkg.github.com/
username=mohakhlf
email=mohakhellafi@gmail.com
strict-ssl=false
always-auth=true
" >> .npmrc
cd ../gdrive && touch .npmrc && echo "
//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN
@mohakhlf:registry=https://npm.pkg.github.com/
username=mohakhlf
email=mohakhellafi@gmail.com
strict-ssl=false
always-auth=true
" >> .npmrc
cd .. && GATEWAY_PORT=$PORT docker-compose -f docker-compose.yaml -f docker-compose-prod.yaml up --build -d