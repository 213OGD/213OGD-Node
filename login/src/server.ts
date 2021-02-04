import { ApolloServer, gql } from 'apollo-server';
import connect from './database/database';
import UserModel from './models/UserModel';

export type UserType = {
    username: string;
    mail: string;
    password: string;
}

const typeUsers = gql`
    type User {
        _id: ID
        username: String
        mail: String
    }

    type Query {
        users: [User]
    }

    type Mutators {
        addUser(username: String!, mail: String!, password: String!) : [User]
    }
`;
const resolvers = {
  Query: {
    users: async () => {
      const users = await UserModel.find();
      return users;
    },
  },
};

const server = new ApolloServer({ typeUsers, resolvers });

connect(`${process.env.MONGO_URI}`);
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
