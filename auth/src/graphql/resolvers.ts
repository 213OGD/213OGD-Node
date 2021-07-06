/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, no-console, no-useless-catch, consistent-return */
import { AuthenticationError } from 'apollo-server';
import {
  comparePassword,
  encryptPassword,
  getPayload,
  getToken,
} from '../util';
import { User } from '../models/UserModel';

export enum Roles {
  student = "student",
  teacher = "teacher"
}

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
  },
  User: {
    __resolveReference: async (ref: any) => {
      const currentUser = await User.findOne({ _id: ref.id });
      return currentUser;
    },
  },
  Mutation: {
    addUser: async (
      _: unknown,
      args: { user: { mail: string; username: string; password: string; role?: Roles } }
      ) => {
      const user = await User.findOne({ mail: args.user.mail });
      if (user) {
        throw new AuthenticationError('User Already Exists!');
      }

      const newUser = {
        username: args.user.username,
        mail: args.user.mail,
        password: await encryptPassword(args.user.password),
        role: args.user.role
      };

      try {
        const addUser = await User.create(newUser);
        // console.log(addUser);
        const payload = { _id: addUser._id, role: addUser.role };
        const token = getToken(payload);

        return { user: addUser, token };
      } catch (e) {
        throw e;
      }
    },

    login: async (_: unknown, args: { mail: string; password: string }) => {
      // Finding a user from user collection.
      const user = await User.findOne({ mail: args.mail });
      // Checking For Encrypted Password Match with util func.
      if (user) {
        const isMatch = await comparePassword(args.password, user.password);
        if (isMatch) {
          // Creating a Token from User Payload obtained.
          const token = getToken({_id: user._id, role: user.role});
          return { user, token };
        }
        // Throwing Error on Match Status Failed.
        throw new AuthenticationError('Wrong Password!');
      }
    },

    getAuthPayload: async (_: unknown, args: { token: string }) => {
      const isAuth = await getPayload(args.token);

      console.log('isAuth',isAuth);
      if(isAuth?.loggedIn){
        return { loggedIn: isAuth.loggedIn, role: isAuth.role }
      }
      return { loggedIn: isAuth.loggedIn};
    },
  },
};

export { resolvers };
