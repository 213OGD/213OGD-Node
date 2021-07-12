/* eslint-disable @typescript-eslint/ban-types, consistent-return, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-shadow, @typescript-eslint/ban-ts-comment */
import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { readFileSync } from 'fs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { applyMiddleware } from 'graphql-middleware';
import { FileMiddleware } from '@mohakhlf/213ogdcommon';
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
    const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
    const schemaWithMiddle = applyMiddleware(schema, FileMiddleware);
    const server = new ApolloServer({
      schema: schemaWithMiddle,
      context: ({ req }) => {
        const { user, url } = req.headers;
        return { user, url };
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
