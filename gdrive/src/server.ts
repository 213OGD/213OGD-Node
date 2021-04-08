/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
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
  const typeDefs = gql(
    readFileSync('src/graphql/schema.graphql').toString('utf-8')
  );

  await connect(`${process.env.MONGO_URI}`);

  const server = new ApolloServer({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

start();
