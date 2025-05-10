import { CGCproduct } from "@/types";
import { connecttodatabase } from "@/lib/db/mongodb"
import CGCProduct from "@/models/CgcProduct";

export async function getCGCProducts(page: number, size: number, q?: string) : Promise<{
  cgcProducts: CGCproduct[];
  cgcProductsCount: number;
}> {
   await connecttodatabase();

   const skip = (page - 1) * size;
   const searchQuery = q ? {
    $or: [
          { name: { $regex: q, $options: 'i' } },
          { itemFeatures: { $regex: q, $options: 'i' } },
          { type: { $regex: q, $options: 'i' } },
    ]
   }
   : {};
   const [rawCgcProducts, cgcProductsCount] = await Promise.all([
    CGCProduct.find(searchQuery).sort({id : 1}).skip(skip).limit(size).lean(),
    CGCProduct.find(searchQuery).countDocuments(),
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