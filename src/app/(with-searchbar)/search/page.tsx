import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagiation";
import { getCGCProducts } from "@/lib/service/CGCProductService";
import style from "./search-page.module.css";

type Props = {
  searchParams: Promise<{
    q?: string;
    page?: number | string;
    category?: string | string[];
  }>;
};

function normalizeCategories(category?: string | string[]) {
  if (!category) return [];
  return Array.isArray(category) ? category.filter(Boolean) : [category];
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = "" } = await searchParams;

  return {
    title: `${q} : 천기초 제품 검색`,
    description: `${q} 검색 결과입니다`,
    openGraph: {
      title: `${q} : 천기초 제품 검색`,
      description: `${q} 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { q = "", page = "1", category } = await searchParams;
  const selectedCategories = normalizeCategories(category);
  const pageNumber = Number(page);
  const size = 10;
  const { cgcProducts, cgcProductsCount } = await getCGCProducts(pageNumber, size, q, selectedCategories);

  return (
    <Suspense key={`${q}-${selectedCategories.join(',')}`} fallback={<BookListSkeleton count={5} />}>
      <section className={style.summary}>
        <div className={style.field}>
          <span className={style.label}>검색어</span>
          <strong>{q || "-"}</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>검색 결과</span>
          <strong>{`${cgcProductsCount}건`}</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>카테고리</span>
          <strong>{selectedCategories.length > 0 ? selectedCategories.join(', ') : "전체"}</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>현재 페이지</span>
          <strong>{pageNumber}</strong>
        </div>
        <Link href="/" className={style.resetLink}>
          전체 목록
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
        categoryQuery={selectedCategories}
      />
    </Suspense>
  );
}
