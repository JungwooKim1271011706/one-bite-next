import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://192.168.219.107:27017/cgcdb";

if (!MONGODB_URI) {
    throw new Error("");
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}
  
declare global {
  var mongoose: MongooseCache | undefined;
}

// 캐시 객체 생성 (명시적으로 초기화)
const globalCache = globalThis as typeof globalThis & { mongoose: MongooseCache };

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

export async function connecttodatabase() {
  if (globalCache.mongoose.conn) {
    return globalCache.mongoose.conn;
  }

  if (!globalCache.mongoose.promise) {
    globalCache.mongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    globalCache.mongoose.conn = await globalCache.mongoose.promise;
  } catch (e) {
    globalCache.mongoose.promise = null;
    throw e;
  }

  return globalCache.mongoose.conn;
}