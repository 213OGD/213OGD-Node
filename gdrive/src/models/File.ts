/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

export interface FileDoc extends mongoose.Document {
  googleId: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: [string];
}

interface FileModel extends mongoose.Model<FileDoc> {}

const FilesSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    webViewLink: { type: String, required: true },
    iconLink: { type: String, required: true },
    tags: { type: Array },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        ret.id = ret._id;
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete ret._id;
      },
    },
  }
);

const File = mongoose.model<FileDoc, FileModel>('File', FilesSchema);

export { File };
