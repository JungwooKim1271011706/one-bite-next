import { CGCproduct } from "@/types";
import { connecttodatabase } from "@/lib/db/mongodb"
import CGCProduct from "@/models/CgcProduct";

export async function getCGCProducts(page: number, size: number, q?: string, category?: string) : Promise<{
  cgcProducts: CGCproduct[];
  cgcProductsCount: number;
}> {
   await connecttodatabase();

   const skip = (page - 1) * size;
   const filter: any = {};

   if (q) {
    filter.$or = [
          { name: { $regex: q, $options: 'i' } },
          { itemFeatures: { $regex: q, $options: 'i' } },
          { type: { $regex: q, $options: 'i' } },
    ];
   }

   if (category) {
    const categories = category.split(',').map(c => c.trim()).filter(c => c);
    if (categories.length > 0) {
        filter.category = { $in: categories };
    }
   }

   const [rawCgcProducts, cgcProductsCount] = await Promise.all([
    CGCProduct.find(filter).sort({id : 1}).skip(skip).limit(size).lean(),
    CGCProduct.find(filter).countDocuments(),
  ])

  const cgcProducts: InstanceType<typeof CGCProduct>[] = rawCgcProducts.map(({ _id, __v, ...rest }) => rest);
  return {
    cgcProducts : cgcProducts,
    cgcProductsCount: cgcProductsCount
  };
}

export async function getCGCProductById (id: number): Promise<CGCproduct | null> {
  await connecttodatabase();

  const rawCgcProduct = await CGCProduct.findOne({ id }).lean();
  if (!rawCgcProduct) {
    console.log(" > id에 해당하는 제품이 없음. id : ", id);
    return null;
  } 

  const { _id, __v, ...rest} = rawCgcProduct as { [key: string]: any};
  return rest as CGCproduct;
}

export async function getCGCProductCategories(): Promise<string[]> {
  await connecttodatabase();

  const categories = await CGCProduct.distinct("category");
  return categories;
}