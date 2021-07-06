/* eslint-disable import/prefer-default-export */
import { Roles } from 'graphql/resolvers';
import mongoose from 'mongoose';

interface UserDoc extends mongoose.Document {
  username: string;
  mail: string;
  password: string;
  role: Roles
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["teacher", "student"], default:"student"},
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
