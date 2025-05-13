// src/models/AdminUser.ts
import mongoose, { Schema, Document, model } from 'mongoose'
import { connecttodatabase } from '@/lib/db/mongodb';

await connecttodatabase();

const models = mongoose.models;

export interface CGCUserDocument extends Document {
  id: string
  name: string
  email: string
  position?: string
  department?: string
  phoneNumber?: string
  password: string
  role: 'admin' | 'user'
}

const CGCUserSchema = new Schema<CGCUserDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String },
  department: { type: String },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
})

const CGCUser = models.CGCUser || model<CGCUserDocument>('CGCUser', CGCUserSchema, 'cgcusers');

export default CGCUser