import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Files from './models/FileModels';

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

function saveDoc() {
  let doc1 = new Files({ name: 'test', googleId: '1', tags: ['test'] });
  doc1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log('Document inserted');
  });
}

// Routes
app.get('/', (req, res) => {
  saveDoc();
  res.send('Hello World');
});

app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong adress' });
});

// Start Server
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on http://localhost:5000'));
