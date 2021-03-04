import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import 'dotenv/config';
import connect from './database/database';
// import FileModels from './models/FileModels';
import { resolvers } from './resolvers/resolver';


export type FileType = {
  googleID: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: [string];
};

const typeDefs = readFileSync('src/graphql/schema.graphql').toString('utf-8');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
try {
  console.log('Mongo uri', process.env.MONGO_URI);
  connect(`${process.env.MONGO_URI}`);
} catch (e) {
  console.error('Error Mongoose', e);
}

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
