/* eslint-disable @typescript-eslint/ban-types, consistent-return, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-shadow, @typescript-eslint/ban-ts-comment */
import { ApolloServer, AuthenticationError, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { readFileSync } from 'fs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import connect from './database/database';
// import FileModels from './models/FileModels';
import resolvers from './resolvers/resolver';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

export type FileType = {
  googleID: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: [string];
};

export const getPayload = (token: string): Record<string, boolean> => {
  try {
    // Verify JWT Token
    jwt.verify(token, `${process.env.SECRET_TOKEN}`);

    return { loggedIn: true };
  } catch (err) {
    // Failed Login Status
    // Add Err Message
    return { loggedIn: false };
  }
};

const start = async () => {
  try {
    const typeDefs = gql(
      readFileSync('src/graphql/schema.graphql').toString('utf-8')
    );
    await connect(`${process.env.MONGO_URI}`);
    const server = new ApolloServer({
      // @ts-ignore
      schema: buildFederatedSchema([{ typeDefs, resolvers }]),
      context: ({ req }) => {
        // const user = req.headers.user ? req.headers.user : null;
        // console.log('user', user);
        // if (typeof user === 'string') {
        //   const { loggedIn } = getPayload(user);
        //   console.log('loggedIn', loggedIn);
        //   if (loggedIn === false) {
        //     console.log("on passe par l'ereur");
        //     // throw new AuthenticationError('you must be logged in');
        //   }
        // }
        // return { user };
      },
    });
    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (error) {
    console.error(`Unable to start gateway: ${error.message}`);
    process.exit(1);
  }
};

start();
