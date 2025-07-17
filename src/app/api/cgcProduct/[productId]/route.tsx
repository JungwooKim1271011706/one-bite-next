// app/api/product/route.ts
import { connecttodatabase } from "@/lib/db/mongodb";
import CGCProduct from "@/models/CgcProduct";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { productId: string } }) {
  await connecttodatabase();

  const { productId } = await context.params; // 비동기 await 필요
  const CGCproduct = await CGCProduct.findOne({ id: Number(productId) }).lean();
  if (!CGCproduct) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(CGCproduct);
}