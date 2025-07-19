import CGCProductCategories from "@/components/CGCProductCategories";
import CGCProductListWithPanel from "@/components/CGCProductListWithPanel"
import Pagination from "@/components/pagiation"
import { getCGCProductCategories, getCGCProducts } from "@/lib/service/CGCProductService"
import { headers } from "next/headers";

export default async function Page(props: any) {


  const cgcProductCategories = await getCGCProductCategories();

  const headersList = headers()
  const hostHeader = (await headersList).get('host') || 'localhost'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseHost = hostHeader.includes(':')
    ? hostHeader.replace(/:\d+$/, ':39443')
    : `${hostHeader}:39443`
  const baseUrl = `${protocol}://${baseHost}`

  return (
    <div>
      <h3>천기초 - 제품리스트</h3>
      <CGCProductCategories categories={cgcProductCategories} baseUrl={baseUrl} />
      {/* <CGCProductListWithPanel products={cgcProducts} baseUrl={baseUrl}/> */}
    </div>
  );
}