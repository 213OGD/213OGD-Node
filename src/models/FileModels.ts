import mongoose from 'mongoose';

export interface Ifile {
  _id: string;
  googleId: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: [string];
}

const { Schema } = mongoose;
const FilesSchema = new Schema({
  googleId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  webViewLink: { type: String, required: true },
  iconLink: { type: String, required: true },
  tags: { type: Array },
});

export default mongoose.model('File', FilesSchema);
