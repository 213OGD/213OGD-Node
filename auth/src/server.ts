import { ApolloServer, gql } from 'apollo-server';
import 'dotenv/config';
import connect from './database/database';
import UserModel from './models/UserModel';

export type UserType = {
    _id: string;
    username: string;
    mail: string;
    password: string;
}

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        mail: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
      addUser(user: UserInput) : User
    }

    input UserInput{
      username: String
      mail: String
      password: String
    }
`;

// type Mutation {
//   addUser(username: String!, mail: String!, password: String!) : User!
// }
// type Mutation {
//   addUser(User: UserInput) : User
// }

// input UserInput {
// username: String
// mail: String
// password: String
// }

const resolvers = {
  Query: {
    users: async () => {
      const users = await UserModel.find();
      return users;
    },
  },
  Mutation: {
    addUser: async (_:unknown, user: any) => {
      const addUser = await UserModel.create(user.user);
      console.log('log', addUser);
      // return await addUser.save();
      return addUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

connect(`${process.env.MONGO_URI}`);
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
