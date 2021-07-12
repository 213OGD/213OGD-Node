/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import { ResolverMap } from 'types/graphql-utils';
import TagMutation, { TagQuery } from './tag.resolver';
import { FileMutation, FileQuery } from './file.resolver';

const resolvers: ResolverMap = {
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
