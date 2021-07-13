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

1. add script to package.json (see issue below) 
`"start": "nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec \"ts-node\" src/server.ts"`

2. create `.env` in `./gdrive` & `./gateway` & `./auth` directories

3. create `.credentials.json` in `./gdrive/src` directory
# Configure Database

1. `npm i mongoose @types/mongoose`

# Known issues

1. For Windows users, we cannot use simple quotes to execute ts-node command. Using double quotes with backslash instead. 
WORKAROUND : PLZ USE DOCKER !!!

## Démarrer en dev

### 1. Rendre le fichier start_dev.sh executable

```sh 
chmod +x start_dev.sh
```
OU
```sh 
chmod 755 start_dev.sh
``` 

### 2. Lancer le projet docker-compose avec la cmd

```sh
sh ./start_dev.sh
```
## Démarrer en prod

### 1. Rendre le fichier start_prod.sh executable

```sh 
chmod +x start_prod.sh
```
OU
```sh 
chmod 755 start_prod.sh
``` 

### 2. Préciser le port & lancer le projet docker-compose avec la cmd

```sh
PORT=*PORT* sh ./start_prod.sh
```

### Bien penser à ajouter le mail de service account au personne ayant acces au ficher

### Pour pourvoir installer le package `@mohakhlf/common` il faut cree un `.npmrc` à la racine des dossiers auth et gdrive
