import { ApolloServer, gql } from 'apollo-server';
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

const typeDefs = gql`
  type File {
    _id: String
    googleId: String
    name: String
    webViewLink: String
    iconLink: String
    tags: [String]
  }

  input tagInput {
    tags: [String]
  }

  input fileInput {
    _id: String
    tags: [String]
  }

  type Query {
    file: File
    files: [File]
  }

  type Mutation {
    updateTag(file: fileInput): File
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     files: async () => {
//       const files = await FileModels.find();
//       return files;
//     },
//   },
// };

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
