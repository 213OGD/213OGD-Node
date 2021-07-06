import { ApolloServer } from 'apollo-server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

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
        if (context && context.user) {
          // @ts-ignore
          request.http.headers.set(
            "user",
            JSON.stringify(context.user)
            );
          }
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
          const token = req.headers.authorization || null;
          if(token && process.env.SECRET_TOKEN) {
            const user: any = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
            delete user.iat;
            delete user.exp;
            return { user };
          }
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

