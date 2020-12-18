# 213ODG-NODE

# Project Version

Node v15.4.0

# Prerequisites

- Typescript `npm i -g typescript`
- TS-node `npm i -g ts-node`
- Prettier `npm i -g prettier`
- ESlint `npm i -g eslint`
- Jest `npm i -g jest`

# Configure Files

1. add script to package.json (see issue below) `"start": "nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec \"ts-node\" src/server.ts"`

# Configure Database

1. `npm i mongoose @types/mongoose`

# Known issues

1. For Windows users, we cannot use simple quotes to execute ts-node command. Using double quotes with backslash instead.
