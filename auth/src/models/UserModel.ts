/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

interface UserDoc extends mongoose.Document {
  username: string;
  mail: string;
  password: string;
}



const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<UserDoc>('User', UserSchema);

export { User };
