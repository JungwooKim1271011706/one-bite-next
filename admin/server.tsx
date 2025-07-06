import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { adminJs, router as adminRouter } from './index'
import { fileURLToPath } from 'url';
import path from 'path'
import formidableMiddleware from 'express-formidable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(formidableMiddleware({
  maxFileSize: 10 * 1024 * 1024 * 1024, // 10GB
}));

app.use((req, res, next) => {
  req.setTimeout(10 * 60 * 1000); // 10분
  res.setTimeout(10 * 60 * 1000); // 10분
  next();
});

// ✅ 10GB 제한 미들웨어 추가
app.use((req: Request, res: Response, next: NextFunction): void => {
  const MAX_SIZE = 10 * 1024 * 1024 * 1024; // 10GB
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);

  if (contentLength > MAX_SIZE) {
    res.status(413).send('파일이 너무 큽니다. (10GB 제한)');
    return;
  }

  next();
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(adminJs.options.rootPath, adminRouter);
app.use(express.json({ limit: '10gb'}));
app.use(express.urlencoded({ extended: true, limit: '10gb'}));

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('🔥 전역 에러:', err);
  res.status(500).send('Internal Server Error');
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(5555, () => {
    console.log(`AdminJS started on http://localhost:5555${adminJs.options.rootPath}`)
  });
});