import mongoose from 'mongoose';

const { Schema } = mongoose;
const FilesSchema = new Schema({
  name: { type: String },
  googleId: { type: String },
  tags: { type: Array },
});

export default mongoose.model('Files', FilesSchema);
