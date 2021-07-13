/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return */
import { ResolverMap } from 'types/graphql-utils';
import TagMutation, { TagQuery } from './tag.resolver';
import { FileMutation, FileQuery } from './file.resolver';

const resolvers: ResolverMap = {
  Query: {
    ...FileQuery,
    ...TagQuery,
  },
  File: {
    id: ({ _id }) => {
      return _id;
    },
    tags: ({ tags }) => {
      return tags.map((name: string) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
    },
  },
  Tag: {
    name: ({ name }) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },
  Mutation: {
    ...TagMutation,
    ...FileMutation,
  },
};

export default resolvers;
