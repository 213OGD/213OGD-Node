/* eslint-disable consistent-return, @typescript-eslint/no-explicit-any, no-console */
import mongoose from 'mongoose';

const connect = async (uri: string): Promise<any> => {
  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });

    console.log('connected to database');
    return db;
  } catch (error) {
    console.log(error.message, ' ', `${uri}`);
  }
};

export const disconnect = (): void => {
  mongoose
    .disconnect()
    .then(() => console.log('Database connection closed.'))
    .catch((err: Error) => console.log(err.message));
};

export default connect;
