/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import TagMutation, { TagQuery } from './tag.resolver';
import { FileMutation, FileQuery } from './file.resolver';

const resolvers = {
  Query: {
    ...FileQuery,
    ...TagQuery,
  },
  Mutation: {
    ...TagMutation,
    ...FileMutation,
  },
};

export default resolvers;
