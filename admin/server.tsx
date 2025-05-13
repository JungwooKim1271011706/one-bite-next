import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { adminJs, router as adminRouter } from './index'

const app = express()

app.use(adminJs.options.rootPath, adminRouter)

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(5555, () => {
    console.log(`AdminJS started on http://localhost:5555${adminJs.options.rootPath}`)
  });
});