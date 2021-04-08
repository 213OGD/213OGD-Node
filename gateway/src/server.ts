import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import 'dotenv/config';


if (!process.env.GDRIVE_URL && !process.env.AUTH_URL) {
  throw new Error('URI must be defined');
}


  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: process.env.AUTH_URL },
      { name: 'gdrive', url: process.env.GDRIVE_URL },
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