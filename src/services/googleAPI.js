// DRIVE
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const FileModels = require('../models/FileModels')

// const drive = google.drive('v3');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

async function getGoogleFiles(){
  // Load client secrets from a local file.
  // fs.readFile('src/credentials.json', (err, content) => {
  //   if (err) return console.log('Error loading client secret file:', err);
  //   // Authorize a client with credentials, then call the Google Drive API.
  //   // @ts-ignore
  //   return authorize(JSON.parse(content), listFiles);
  // });

  const content = fs.readFileSync('src/credentials.json');
  return authorize(JSON.parse(content), listFiles);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  const token = fs.readFileSync(TOKEN_PATH)
  // , (err, token) => {
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   if (err) return getAccessToken(oAuth2Client, callback);

    // @ts-ignore
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(oAuth2Client);
  };

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, webViewLink, iconLink)',
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      // @ts-ignore
      const { files } = res.data;
      // @ts-ignore
      if (files.length) {
        console.log('Files:');
        // pour chaque fichier => save en bdd

        // eslint-disable-next-line array-callback-return
        files.map((file) => {
          // recupere tout l'objet drive document avec toute ses information. voir file.json
          console.log(FileModels);
          let newFile = new FileModels.default(file);
          newFile.save(function(err, doc){
            if(err) return console.error(err);
            console.log("Document inserted");
          })
          // Nom + id du document
          // console.log(`${file.name} (${file.id})`);
          // // permet de recuperer le lien du document
          // console.log(`${file.webViewLink}`);
        });
          return files;
      } else {
        console.log('No files found.');
        return false;
      }
    }
  );
}

module.exports = getGoogleFiles;