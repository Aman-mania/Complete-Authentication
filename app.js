import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/connectdb.js'

// --- (A) For ESM: we need these to replicate __dirname and __filename ---
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// -----------------------------------------------------------------------

const app = express()
const port = process.env.PORT
const URL = process.env.DATABASE_URL

app.use(cors())
connectDB(URL)
app.use(express.json())

// Your API routes
app.use('/api/user', userRoutes)

// --- (B) Serve static frontend files from 'public' folder ---
app.use(express.static(path.join(__dirname, 'public')))

// Optional: If you want the root URL '/' to serve index.html explicitly:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
