import { NextResponse } from "next/server";
import { connecttodatabase } from "@/lib/db/mongodb";
import CGCProduct from "@/models/CgcProduct";

export async function GET(request: Request) {
  await connecttodatabase();
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const size = Number(searchParams.get("size") || 10);
  const categoryParam = searchParams.get("category");
  const search = searchParams.get('q');

  const filter: any = { $and: [] };
  const conditions: any[] = [];

  if (categoryParam) {
    const categories = categoryParam.split(',').map(c => c.trim()).filter(c => c);
    if (categories.length > 0) {
      conditions.push({ category: { $in: categories } });
    }
  }

  if (search) {
    conditions.push({
      $or: [
        { name : { $regex: search, $options: "i" } },
        { item_features: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ]
    });
  }

  if (conditions.length > 0) {
    filter.$and = conditions;
  } else {
    delete filter.$and;
  }

  const totalCount = await CGCProduct.countDocuments(filter);
  const products = await CGCProduct.find(filter)
    .skip((page - 1) * size)
    .limit(size)
    .lean();

  return NextResponse.json({ products, totalCount });
}