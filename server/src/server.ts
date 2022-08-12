import compression from 'compression';
import cors from 'cors';
import express from 'express';
import path from 'path';
// import { connectToDatabase } from './db/conn';

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
app.use(express.static(path.join(__dirname, 'build')));
const server = app.listen(port, () => {
  // connectToDatabase();
  console.log(`Server is running on port: ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => console.log('Server shutting down.'));
});
