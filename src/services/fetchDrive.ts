import { google } from 'googleapis';

const keyFile = require('./credz.json');

const JWT = new google.auth.JWT(
  keyFile.client_email,
  './credz.json',
  keyFile.private_key,
  ['https://www.googleapis.com/auth/drive'],
  undefined,
  keyFile.private_key_id
);

JWT.authorize((authErr) => {
  // eslint-disable-next-line no-console
  if (authErr) console.log('error : ', authErr);
  // eslint-disable-next-line no-console
  console.log('Authorization accorded');
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  listFiles(JWT);
});

/**
 * Lists the names and IDs of up to 10 files.
 */
async function listFiles(auth: typeof JWT) {
  const drive = google.drive({
    version: 'v3',
    auth,
  });

  await drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, webViewLink, iconLink, mimeType)',
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);

      const files = res?.data.files;

      if (files?.length) {
        files.forEach((file) => {
          // eslint-disable-next-line no-console
          console.log(file.id);
        });
      } else {
        // eslint-disable-next-line no-console
        console.log('No files found.');
      }
      return files;
    }
  );
}
