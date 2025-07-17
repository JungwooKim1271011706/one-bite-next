import CGCProductListWithPanel from "@/components/CGCProductListWithPanel"
import Pagination from "@/components/pagiation"
import { getCGCProducts } from "@/lib/service/CGCProductService"
import style from './page.module.css';

type Props = {
  searchParams?: {
    page?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params?.page || '1')
  const size = 10

  const { cgcProducts, cgcProductsCount } = await getCGCProducts(page, size)

  return (
    <div className={style.container}>
      <section>
        <h3>천기초 - 제품리스트</h3><br/>
        <CGCProductListWithPanel products={cgcProducts} />
        <Pagination currentPage={page} totalCount={cgcProductsCount} groupSize={10} searchQuery="" />
      </section>
    </div>
  )
}