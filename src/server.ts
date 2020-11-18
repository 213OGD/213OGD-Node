import express from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import FileController from './controllers/FileController';

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
app.put('/api/file/update', asyncHandler(FileController.update));
app.delete('/api/file/delete', asyncHandler(FileController.delete));
app.get('/', (req, res) => res.send('Hello World'));
app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong address' });
});

// Start Server
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on http://localhost:5000'));