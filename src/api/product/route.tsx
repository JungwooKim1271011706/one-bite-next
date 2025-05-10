// app/api/product/route.ts
import { connecttodatabase } from "@/lib/db/mongodb";
import CGCProduct from "@/models/CgcProduct";
import { NextResponse } from "next/server";

export async function GET() {
  await connecttodatabase();

  const CGCproducts = await CGCProduct.find().lean();
  return NextResponse.json(CGCproducts);
}
