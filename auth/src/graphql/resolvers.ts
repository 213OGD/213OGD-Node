/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, no-console, no-useless-catch, consistent-return */
import { AuthenticationError } from 'apollo-server';
import { comparePassword, encryptPassword, getPayload, getToken } from '../util';
import { User } from '../models/UserModel';

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
      args: { username: any; mail: any; password: any }
    ) => {
      const newUser = {
        username: args.username,
        mail: args.mail,
        password: await encryptPassword(args.password),
      };

      // Get user document from 'user' collection.
      const user = await User.findOne({ mail: args.mail }); // Check If User Exists Already Throw Error
      if (user) {
        throw new AuthenticationError('User Already Exists!');
      }

      try {
        const addUser = await User.create(newUser);
        console.log('addUser', addUser);

        // Creating a Token from User Payload obtained.
        const token = getToken(addUser._id);

        // return await addUser.save();
        // console.log('return', {addUser, token});
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
          const token = getToken(user._id);
          return { user, token };
        }
        // Throwing Error on Match Status Failed.
        throw new AuthenticationError('Wrong Password!');
      }
    },

    getAuthPayload: async (_:unknown, args: {token: string}) => {

      const isAuth = getPayload(args.token);

      if(isAuth){
        return isAuth.loggedIn ? true : false;
      }
      return false;
      }
  },
};

export { resolvers };
