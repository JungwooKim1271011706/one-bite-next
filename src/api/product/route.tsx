// app/api/product/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/CgcProduct";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const products = await Product.find().lean();
  return NextResponse.json(products);
}
