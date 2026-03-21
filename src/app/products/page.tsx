// app/products/page.tsx

import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagination";
import { connecttodatabase } from "@/lib/db/mongodb";
import CGCProduct from "@/models/CgcProduct";
import { CGCproduct } from "@/types";

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function ProductPage({ searchParams }: Props) {
  await connecttodatabase();

  const params = await searchParams;
  const page = Number(params?.page || "1");
  const size = 10;
  const currentPage = Math.max(page, 1);
  const skip = (currentPage - 1) * size;

  const [rowCGCProducts, CGCProductsCount] = await Promise.all([
    CGCProduct.find().sort({ id: 1 }).skip(skip).limit(size),
    CGCProduct.countDocuments(),
  ]);

  const CGCProducts: CGCproduct[] = rowCGCProducts.map((p) => ({
    id: p.id,
    name: p.name,
    expirationDate: p.expirationDate,
    expirationDateNewLot: p.expirationDateNewLot,
    suggestedRetailPrice: p.suggestedRetailPrice,
    suggestedWholesalePrice: p.suggestedWholesalePrice,
    specification: p.specification,
    category: p.category,
    type: p.type,
    itemFeatures: p.itemFeatures,
    imageA: p.imageA,
    imageB: p.imageB,
    audioFileKey: p.audioFileKey,
    audioFileMimeType: p.audioFileMimeType,
  }));

  return (
    <div>
      <h1>상품 목록</h1>
      <ul>
        {CGCProducts.map((cgcProduct) => (
          <CGCProductItem key={cgcProduct.id} {...cgcProduct} />
        ))}
        <Pagination currentPage={currentPage} totalCount={CGCProductsCount} groupSize={size} searchQuery="" />
      </ul>
    </div>
  );
}
