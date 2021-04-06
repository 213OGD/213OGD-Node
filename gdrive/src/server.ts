/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import 'dotenv/config';
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

const start = async () => {
  const typeDefs = readFileSync('src/graphql/schema.graphql').toString('utf-8');

  await connect(`${process.env.MONGO_URI}`);

  const server = new ApolloServer({ typeDefs, resolvers });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

start();
