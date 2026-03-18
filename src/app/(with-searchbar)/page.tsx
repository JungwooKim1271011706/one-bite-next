import CGCProductListWithPanel from "@/components/CGCProductListWithPanel";
import Pagination from "@/components/pagiation";
import { getCGCProducts } from "@/lib/service/CGCProductService";
import style from "./page.module.css";

type Props = {
  searchParams?: Promise<{
    page?: string;
    category?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params?.page || "1");
  const category = params?.category || "";
  const size = 10;

  const { cgcProducts, cgcProductsCount } = await getCGCProducts(page, size, undefined, category);

  return (
    <div className={style.container}>
      <section>
        <h3>천기초 - 제품리스트</h3>
        <CGCProductListWithPanel products={cgcProducts} />
        <Pagination
          currentPage={page}
          totalCount={cgcProductsCount}
          groupSize={10}
          searchQuery=""
          categoryQuery={category}
        />
      </section>
    </div>
  );
}
