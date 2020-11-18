import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import readline from 'readline';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import * as fs from 'fs';
import FileController from './controllers/FileController';

const app = express();
const drive = google.drive('v3');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
dotenv.config();

// DATABASE
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to database'))
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.log(err.message));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    res.status(400).json({
      success: false,
      message: 'The name is already used',
    });
  }
});

// DRVE

// Load client secrets from a local file.
// eslint-disable-next-line consistent-return
fs.readFile('src/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  // eslint-disable-next-line consistent-return
  fs.readFile(TOKEN_PATH, (err, token) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (err) return getAccessToken(oAuth2Client, callback);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client: any, callback: any) {
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
    // eslint-disable-next-line consistent-return
    oAuth2Client.getToken(code, (err: any, token: any) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      // eslint-disable-next-line consistent-return,@typescript-eslint/no-shadow
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
function listFiles(auth: any) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, webViewLink, iconLink)',
    },
    // eslint-disable-next-line consistent-return
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { files } = res.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (files.length) {
        console.log('Files:');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        files.map((file) => {
          // recupere tout l'objet drive document avec toute ses information. voir file.json
          console.log(file);
          // Nom + id du document
          console.log(`${file.name} (${file.id})`);
          // permet de recuperer le lien du document
          console.log(`${file.webViewLink}`);
          return file;
        });
      } else {
        console.log('No files found.');
      }
    }
  );
}

// Routes
app.post('/api/file/create', asyncHandler(FileController.create));
app.get('/api/file/list', asyncHandler(FileController.read));
app.get('/api/drive', listFiles);
app.put('/api/file/update', asyncHandler(FileController.update));
app.delete('/api/file/delete', asyncHandler(FileController.delete));
app.get('/', (req, res) => res.send('Hello World'));
app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong address' });
});

// Start Server
app.listen(process.env.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${process.env.PORT}`)
);
