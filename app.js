// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/connectdb.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;
const URL = process.env.DATABASE_URL;
const CURL = process.env.DATABASE_URL;

app.use(cors());
connectDB(URL);
connectDB(CURL);

app.use(express.json());

// Mount all routes (users and contacts) on /api/user
app.use('/api/user', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
