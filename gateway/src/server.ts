import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';


  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://ogd213-auth-srv:4000' },
      { name: 'gdrive', url: 'http://ogd213-gdrive-srv:4000' },
    ],
  });
  
  (async () => {
    try {
      const { schema, executor } = await gateway.load();
      const server = new ApolloServer({ schema, executor });
    server.listen().then(({ url }) => {
      console.log(`🚀 Gateway ready at ${url}`);
    })
    } catch (error) {
      console.error('error', error)
    }
})();