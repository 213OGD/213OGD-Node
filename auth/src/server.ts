import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import 'dotenv/config';
import { readFileSync } from 'fs';
import { applyMiddleware } from 'graphql-middleware';
import { AuthMiddleware } from '@mohakhlf/213ogdcommon';
import { getPayload } from './util';

import connect from './database/database';
import { resolvers } from './graphql/resolvers';

const start = async () => {
  try {
    const typeDefs = gql(
      readFileSync('src/graphql/schema.graphql').toString('utf-8')
    );

    await connect(`${process.env.MONGO_URI}`);
    const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
    const schemaWithMiddle = applyMiddleware(schema, AuthMiddleware);
    const server = new ApolloServer({
      schema: schemaWithMiddle,
      context: async ({ req }) => {
        const { user, url } = req.headers;
        return { user, url };
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
