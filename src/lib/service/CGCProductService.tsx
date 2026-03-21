import { CGCproduct } from "@/types";
import { connecttodatabase } from "@/lib/db/mongodb";
import CGCProduct from "@/models/CgcProduct";

export async function getCGCProducts(
  page: number,
  size: number,
  q?: string,
  category?: string | string[]
): Promise<{
  cgcProducts: CGCproduct[];
  cgcProductsCount: number;
}> {
  await connecttodatabase();

  const skip = (page - 1) * size;
  const filters: Record<string, unknown>[] = [];

  if (q) {
    filters.push({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { itemFeatures: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ],
    });
  }

  const categories = Array.isArray(category) ? category.filter(Boolean) : category ? [category] : [];
  if (categories.length === 1) {
    filters.push({ category: categories[0] });
  } else if (categories.length > 1) {
    filters.push({ category: { $in: categories } });
  }

  const searchQuery = filters.length > 0 ? { $and: filters } : {};

  const [rawCgcProducts, cgcProductsCount] = await Promise.all([
    CGCProduct.find(searchQuery).sort({ id: 1 }).skip(skip).limit(size).lean(),
    CGCProduct.find(searchQuery).countDocuments(),
  ]);

  const cgcProducts: InstanceType<typeof CGCProduct>[] = rawCgcProducts.map(({ _id, __v, ...rest }) => rest);
  return {
    cgcProducts,
    cgcProductsCount,
  };
}

export async function getCGCCategories(): Promise<string[]> {
  await connecttodatabase();

  const categories = await CGCProduct.distinct("category");
  return categories
    .map((value) => String(value ?? "").trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));
}

export async function getCGCProductById(id: number): Promise<CGCproduct | null> {
  await connecttodatabase();

  const rawCgcProduct = await CGCProduct.findOne({ id }).lean();
  if (!rawCgcProduct) {
    console.log(" > id에 해당되는 상품이 없음. id : ", id);
    return null;
  }

  const { _id, __v, ...rest } = rawCgcProduct as { [key: string]: any };
  return rest as CGCproduct;
}
