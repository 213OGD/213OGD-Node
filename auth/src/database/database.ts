import mongoose from 'mongoose';

const connect = (uri: string): void => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    })
    // eslint-disable-next-line no-console
    .then(() => console.log('Login: Connected to database'))
    // eslint-disable-next-line no-console
    .catch((err: Error) => console.log(err.message, ' ', `${uri}`));
};
export const disconnect = (): void => {
  mongoose
    .disconnect()
    // eslint-disable-next-line no-console
    .then(() => console.log('Database connection closed.'))
    // eslint-disable-next-line no-console
    .catch((err: Error) => console.log(err.message));
};

export default connect;
