import CGCProductListWithPanel from "@/components/CGCProductListWithPanel"
import Pagination from "@/components/pagiation"
import { getCGCProducts } from "@/lib/service/CGCProductService"
import { headers } from "next/headers";

export default async function Page({ searchParams }: any) {
  const page = Number(searchParams?.page || '1');
  const size = 10;

  const { cgcProducts, cgcProductsCount } = await getCGCProducts(page, size);

    const headersList = headers()
    const hostHeader = (await headersList).get('host') || 'localhost'
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

    // ✅ 포트 유무에 따라 강제 추가
    const baseHost = hostHeader.includes(':')
    ? hostHeader.replace(/:\d+$/, ':39443')
    : `${hostHeader}:39443`
    const baseUrl = `${protocol}://${baseHost}`

  return (
    <div>
      <h3>천기초 - 제품리스트</h3><br />
      <CGCProductListWithPanel products={cgcProducts} baseUrl={baseUrl}/>
      <Pagination currentPage={page} totalCount={cgcProductsCount} groupSize={10} searchQuery="" />
    </div>
  );
}