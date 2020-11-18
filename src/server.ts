import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import FileModels from './models/FileModels';
import FileController from './controllers/FileController';
import asyncHandler from 'express-async-handler';

const app = express();

// Database
mongoose
  .connect(
    'mongodb+srv://213OGD:fK0uRT1SJ5bk@cluster213.l0oyn.mongodb.net/files?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    }
  )
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to database'))
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.log(err.message));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.post('/api/file/create', asyncHandler(FileController.create));
app.get('/api/file/list', asyncHandler(FileController.read));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong adress' });
});

// Start Server
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on http://localhost:5000'));
