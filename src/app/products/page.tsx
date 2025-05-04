// app/products/page.tsx

import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagiation";
import { connecttodatabase } from "@/lib/mongodb";
import CGCProduct from "@/models/CgcProduct";
import { CGCproduct } from "@/types";


type Props = {
  searchParams? : Promise<{
    page? : string;
  }>;
}

export default async function ProductPage( { searchParams } : Props) {
  await connecttodatabase();

  const params = await searchParams;
  const page = Number(params?.page || '1');
  const size = 10;
  const currentPage = Math.max(page, 1);
  const roWCGCProducts = await CGCProduct.find().sort({id : 1}).limit(size);
  const CGCProductsCount = roWCGCProducts.length;

  const CGCProducts: CGCproduct[] = roWCGCProducts.map(p => ({
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
  }));

  return (
    <div>
      <h1>상품 목록</h1>
      <ul>
        {CGCProducts.map((cgcProduct, index) => (
          <CGCProductItem key={index} {...cgcProduct} />)
        )}
        <Pagination currentPage={currentPage} totalCount={CGCProductsCount} groupSize={size} searchQuery=""/>
      </ul>
    </div>
  );
}
