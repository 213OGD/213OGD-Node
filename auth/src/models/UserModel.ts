/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

interface UserDoc extends mongoose.Document {
  username: string;
  mail: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
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

const User = mongoose.model<UserDoc>('User', UserSchema);

export { User };
