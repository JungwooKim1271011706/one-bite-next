import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData, CGCproduct } from "@/types";
import { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";
import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagiation";
import { getDriverImageUrl } from "@/util/driver-utils";
import { getGoogleSheet } from "@/util/driver-utils";
import { headers } from "next/headers";
import { getCGCProducts } from "@/lib/service/CGCProductService";
import CGCProductListWithPanel from "@/components/CGCProductListWithPanel";


type Props = {
  searchParams : Promise<{
    q? : string,
    page? : number}>;
}
export async function generateMetadata({ searchParams} : Props): Promise<Metadata> {
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

export default async function Page({
  searchParams,
}: Props
) {
  const { q = "", page = "1" } = await searchParams;
  const pageNumber = Number(page);
  const size = 10
  const {cgcProducts, cgcProductsCount} = await getCGCProducts(pageNumber, size, q);
  return (
  <Suspense 
    key={q} 
    fallback={<BookListSkeleton count={5} />}>
        <CGCProductListWithPanel products={cgcProducts} />
        <Pagination currentPage={pageNumber} totalCount={cgcProductsCount} groupSize={size} searchQuery={q}/>
  </Suspense>
  );
}