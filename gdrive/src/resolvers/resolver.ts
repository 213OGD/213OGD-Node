/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import TagMutation from './tag.resolver';
import FileQuery from './file.resolver';

const resolvers = {
  Query: {
    ...FileQuery,
  },
  Mutation: {
    ...TagMutation,
  },
};

export default resolvers;