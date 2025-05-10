import mongoose, { Schema, Document, model, models } from 'mongoose';
import { CGCproduct } from '@/types';

export interface CGCProductDocument extends Omit<Document, "id">, CGCproduct {}

const ProductSchema = new Schema<CGCProductDocument>({
  id: { type: Number, required: true, unique: true },
  name: String,
  expirationDate: String,
  expirationDateNewLot: String,
  suggestedRetailPrice: String,
  suggestedWholesalePrice: String,
  specification: String,
  category: String,
  type: String,
  itemFeatures: String,
  imageA: String,
  imageB: String,
});


// ✅ 모델 이름으로 정확히 체크
const CGCProduct = models.CGCProduct || model<CGCProductDocument>("CGCProduct", ProductSchema, "CGCProducts");

export default CGCProduct;
