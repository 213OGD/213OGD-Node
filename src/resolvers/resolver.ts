import { TagMutation } from './tag.resolver';
import { FileQuery } from './file.resolver';

const resolvers = {
  Query: {
    ...FileQuery,
  },
  Mutation: {
    ...TagMutation,
  },
};

export { resolvers };
