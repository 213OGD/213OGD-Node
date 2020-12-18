import { drive_v3, google } from 'googleapis';

import * as keyFile from './odg-296009-7dd1f2235876.json';

export default class FetchDrive {
  public JWT = new google.auth.JWT(
    keyFile.client_email,
    undefined,
    keyFile.private_key,
    ['https://www.googleapis.com/auth/drive'],
    undefined,
    keyFile.private_key_id
  );

  constructor() {
    this.JWT.authorize((authErr) => {
      // eslint-disable-next-line no-console
      if (authErr) {
        console.log('error : ', authErr);
      } else {
        // eslint-disable-next-line no-console
        console.log('Authorization accorded');
      }
    });
  }

  /**
   * Lists the names and IDs of up to 10 files.
   */
  async listFiles(): Promise<drive_v3.Schema$File[] | undefined> {
    const drive = google.drive({
      version: 'v3',
      auth: this.JWT,
    });

    return new Promise((resolve, reject) => {
      drive.files.list(
        {
          pageSize: 10,
          fields:
            'nextPageToken, files(id, name, webViewLink, iconLink, mimeType)',
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            const files = res?.data.files;
            if (files?.length) {
              resolve(files);
            } else {
              // eslint-disable-next-line no-console
              console.log('No files found.');
            }
          }
        }
      );
    });
  }
}

/* const start = async () => {
  let test = new FetchDrive();

  const files = await test.listFiles();
  console.log(files);
};

start(); */
