import { ApolloServer, gql } from 'apollo-server';
import 'dotenv/config';
import connect from './database/database';
import FileModels from './models/FileModels';

export type FileType = {
  googleID: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: [string];
};

const typeDefs = gql`
  type File {
    googleId: String
    name: String
    webViewLink: String
    iconLink: String
    tags: [String]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    files: [File]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    files: async () => {
      const files = await FileModels.find();
      return files;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

connect(`${process.env.MONGO_URI}`);
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
