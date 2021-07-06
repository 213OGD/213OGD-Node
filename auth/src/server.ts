import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import 'dotenv/config';
import { readFileSync } from 'fs';
import { getPayload } from './util';

import connect from './database/database';
import { resolvers } from './graphql/resolvers';

const start = async () => {
  try {
    const typeDefs = gql(
      readFileSync('src/graphql/schema.graphql').toString('utf-8')
    );

    await connect(`${process.env.MONGO_URI}`);

    const server = new ApolloServer({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      schema: buildFederatedSchema([{ typeDefs, resolvers }]),
      context: async ({ req }) => {
        // get the user token from the headers
        // const token = req.headers.authorization || '';
        // console.log('token', token);
        // // try to retrieve a user with the token
        // const  { loggedIn, role } = await getPayload(token);

        // // // add the user to the context
        // return { loggedIn, role };
      },
    });
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (error) {
    console.error(`Unable to start gateway: ${error.message}`);
    process.exit(1);
  }
};

start();
