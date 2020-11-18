import mongoose from 'mongoose';

const { Schema } = mongoose;
const FilesSchema = new Schema({
  googleId: { type: String, unique: true },
  tags: { type: Array },
});

export default mongoose.model('Files', FilesSchema);
