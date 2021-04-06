import { AuthenticationError } from "apollo-server";
import { comparePassword, encryptPassword, getToken } from "./../util";
import UserModel from "./../models/UserModel";

const resolvers = {
    Query: {
      users: async () => {
        const users = await UserModel.find();
        return users;
      },
    },
    Mutation: {
      addUser: async (_: unknown, args: { username: any; mail: any; password: any; }) => {
        const newUser = { username: args.username,mail: args.mail, password: await encryptPassword(args.password) }

           // Get user document from 'user' collection.
        const user = await UserModel.findOne({ mail: args.mail })  // Check If User Exists Already Throw Error  
        if (user) {
        throw new AuthenticationError("User Already Exists!")
        }

        try{
            const addUser = await UserModel.create(newUser);
            console.log('addUser', addUser);

            // Creating a Token from User Payload obtained.
            const token = getToken(addUser);

            
            // return await addUser.save();
            // console.log('return', {addUser, token});
            return ({user: addUser, token});
        } catch (e){
            throw e;
        }
      },

      login: async (_:unknown, args: { mail: string; password: string; }) => {
                // Finding a user from user collection.
            const user = await UserModel.findOne({ mail: args.mail });
            // Checking For Encrypted Password Match with util func.
            if(user){
                // @ts-ignore
                const isMatch = await comparePassword(args.password, user.password);
                if (isMatch) {
                // Creating a Token from User Payload obtained.
                const token = getToken(user);
                return { user, token };
                } else {
                // Throwing Error on Match Status Failed.
                throw new AuthenticationError("Wrong Password!");
                }
            }
        }},
  };

  export { resolvers }