import CGCProductListWithPanel from "@/components/CGCProductListWithPanel"
import Pagination from "@/components/pagiation"
import { getCGCProducts } from "@/lib/service/CGCProductService"

export default async function Page({ searchParams }: any) {
  const page = Number(searchParams?.page || '1');
  const size = 10;

  const { cgcProducts, cgcProductsCount } = await getCGCProducts(page, size);

  return (
    <div>
      <h3>천기초 - 제품리스트</h3><br />
      <CGCProductListWithPanel products={cgcProducts} />
      <Pagination currentPage={page} totalCount={cgcProductsCount} groupSize={10} searchQuery="" />
    </div>
  );
}