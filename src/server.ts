import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

import { connect, disconnect } from './database/database';

import mongoose from 'mongoose';

import FileController from './controllers/FileController';
import AdminController from './controllers/AdminController';

const app = express();

connect(`${process.env.MONGO_URI}`);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    res.status(400).json({
      success: false,
      message: 'The name is already used',
    });
  }
});

// Routes
//Get Datas from Google API
app.get('/admin/saveFiles', asyncHandler(AdminController.create));

// BDD Create
app.post('/api/file/create', asyncHandler(FileController.create));
// BDD Get list of files
app.get('/api/file/list', asyncHandler(FileController.read));

// BDD Update

app.put('/api/file/update', asyncHandler(FileController.update));
// BDD Delete
app.delete('/api/file/delete', asyncHandler(FileController.delete));
// Hello World
app.get('/', (req, res) => res.send('Hello World'));
// Appeler si aucune route = 404
app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong address' });
});

// Start Server
app.listen(process.env.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${process.env.PORT}`)
);
