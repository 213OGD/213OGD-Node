import { drive_v3, google } from 'googleapis';

import * as keyFile from '../credentials.json';

export default class FetchDrive {
  public JWT = new google.auth.JWT(
    keyFile.client_email,
    undefined,
    keyFile.private_key,
    [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.metadata',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.photos.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
    undefined,
    keyFile.private_key_id
  );

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
          fields: 'nextPageToken, files(id, name, webViewLink, iconLink)',
        },
        (err, res) => {
          // console.log('res', res);
          if (err) {
            reject(err);
          } else {
            const files = res?.data.files;
            resolve(files);
          }
        }
      );
    });
  }
}
