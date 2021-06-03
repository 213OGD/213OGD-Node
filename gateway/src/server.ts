import { ApolloServer } from 'apollo-server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import 'dotenv/config';

if (!process.env.GDRIVE_URL && !process.env.AUTH_URL) {
  throw new Error('URI must be defined');
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'auth', url: process.env.AUTH_URL },
    { name: 'gdrive', url: process.env.GDRIVE_URL },
  ],
  // debug: true,
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        // @ts-ignore
        request.http.headers.set(
          "user",
          // @ts-ignore
          context ? JSON.stringify(context.user) : null
        );
      }
    });
  }
});


  
(async () => {
    try {
      const { schema, executor } = await gateway.load();
      const server = new ApolloServer({
        schema,
        executor,
        context: ({ req, res }) => {
          console.log('req', req)
          const user = req.headers.authorization || null;
          return { user };
        }
       });
    server.listen().then(({ url }) => {
      console.log(`🚀 Gateway ready at ${url}`);
    })
    } catch (error) {
        console.error(`Unable to start gateway: ${error.message}`);
        process.exit(1);
    }
    
})();

