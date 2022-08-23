import compression from 'compression';
import cors from 'cors';
import express from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit'
// import { connectToDatabase } from './db/conn';

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,                 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false      // Disable the `X-RateLimit-*` headers
});

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(limiter);
const server = app.listen(port, () => {
  // connectToDatabase();
  console.log(`Server is running on port: ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => console.log('Server shutting down.'));
});
