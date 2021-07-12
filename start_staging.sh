#!/bin/sh
WORKDIR="/home/dflt/ogd213/staging/api"
git fetch origin && git reset --hard origin/staging && git clean -f -d
echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN\n@mohakhlf:registry=https://npm.pkg.github.com/\nusername=mohakhlf\nemail=mohakhellafi@gmail.com\nstrict-ssl=false\nalways-auth=true" > $WORKDIR/auth/.npmrc && echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN\n@mohakhlf:registry=https://npm.pkg.github.com/\nusername=mohakhlf\nemail=mohakhellafi@gmail.com\nstrict-ssl=false\nalways-auth=true" > $WORKDIR/gdrive/.npmrc
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yaml -f docker-compose-prod.yaml up --build -d