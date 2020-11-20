import mongoose from 'mongoose';

const { Schema } = mongoose;
const FilesSchema = new Schema({
  name: { type: String },
  googleId: { type: String, unique: true, required: true },
  tags: { type: Array },
});

export default mongoose.model('FileModels', FilesSchema);
