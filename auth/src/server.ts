import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import { readFileSync } from 'fs';
import { getPayload } from './util';

import connect from './database/database';
import { resolvers } from './graphql/resolvers';


async function start(){

  const typeDefs = readFileSync('src/graphql/schema.graphql').toString('utf-8');

  await connect(`${process.env.MONGO_URI}`);
  
  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  
    // get the user token from the headers
    const token = req.headers.authorization || '';
    // try to retrieve a user with the token
    const { payload: user, loggedIn } = getPayload(token);
  
    // add the user to the context
    return { user, loggedIn };
  
  } });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

start();