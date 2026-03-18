import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagiation";
import Searchbar from "@/components/searchbar";
import { getCGCProducts } from "@/lib/service/CGCProductService";
import style from "./search-page.module.css";

type Props = {
  searchParams: Promise<{
    q?: string;
    page?: number | string;
  }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = "" } = await searchParams;

  return {
    title: `${q} : \uCC9C\uAE30\uCD08 \uC81C\uD488 \uAC80\uC0C9`,
    description: `${q} \uAC80\uC0C9 \uACB0\uACFC\uC785\uB2C8\uB2E4`,
    openGraph: {
      title: `${q} : \uCC9C\uAE30\uCD08 \uC81C\uD488 \uAC80\uC0C9`,
      description: `${q} \uAC80\uC0C9 \uACB0\uACFC\uC785\uB2C8\uB2E4`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { q = "", page = "1" } = await searchParams;
  const pageNumber = Number(page);
  const size = 10;
  const { cgcProducts, cgcProductsCount } = await getCGCProducts(pageNumber, size, q);

  return (
    <Suspense key={q} fallback={<BookListSkeleton count={5} />}>
      <div className={style.searchBox}>
        <Searchbar placeholder={"검색어를 다시 입력하세요"} />
      </div>

      <section className={style.summary}>
        <div className={style.field}>
          <span className={style.label}>{"검색어"}</span>
          <strong>{q || "-"}</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>{"검색 결과"}</span>
          <strong>{`${cgcProductsCount}건`}</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>{"현재 페이지"}</span>
          <strong>{pageNumber}</strong>
        </div>
        <Link href="/" className={style.resetLink}>
          {"전체 목록"}
        </Link>
      </section>

      <div className={style.results}>
        {cgcProducts.map((cgcProduct) => (
          <CGCProductItem key={cgcProduct.id} {...cgcProduct} />
        ))}
      </div>

      <Pagination
        currentPage={pageNumber}
        totalCount={cgcProductsCount}
        groupSize={size}
        searchQuery={q}
      />
    </Suspense>
  );
}
