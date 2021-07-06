/* eslint-disable @typescript-eslint/ban-types, consistent-return, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-shadow,@typescript-eslint/naming-convention
 */
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { User } from './models/UserModel';

export const encryptPassword = (password: string) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
        return false;
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(hash);
        return true;
      });
    });
  });

export const comparePassword = (password: string, hash: string) =>
  new Promise((resolve, reject) => {
    try {
      const isMatch = bcrypt.compare(password, hash);
      resolve(isMatch);
      return true;
    } catch (err) {
      reject(err);
      return false;
    }
  });

export const getToken = (payload: object) => {
  console.log(payload);
  const token = jwt.sign(payload, `${process.env.SECRET_TOKEN}`, {
    expiresIn: 604800, // 1 Week
  });
  return token;
};

export const getPayload = async (
  token: string
): Promise<Record<string, boolean | string>> => {
  const { _id }: any = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
  const user = await User.findOne({ _id });
  if (!user) {
    return { loggedIn: false };
  }
  return { loggedIn: true, role: user.role };
};
