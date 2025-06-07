import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { adminJs, router as adminRouter } from './index'
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(adminJs.options.rootPath, adminRouter)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(5555, () => {
    console.log(`AdminJS started on http://localhost:5555${adminJs.options.rootPath}`)
  });
});