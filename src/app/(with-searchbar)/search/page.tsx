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

// type Props = {
//   searchParams?: {
//     q?: string
//     page?: string
//   }
// }

// export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
//   const q = searchParams?.q || "";
//   return {
//     title: `${q} : 천기초 제품 검색`,
//     description: `${q} 검색 결과입니다`,
//     openGraph: {
//       title: `${q} : 천기초 제품 검색`,
//       description: `${q} 검색 결과입니다`,
//       images: ["/thumbnail.png"],
//     },
//   };
// }
export default async function Page({ searchParams }: any) {
  const headersList = headers()
  const hostHeader = (await headersList).get('host') || 'localhost'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  // ✅ 포트 유무에 따라 강제 추가
  const baseHost = hostHeader.includes(':')
  ? hostHeader.replace(/:\d+$/, ':39443')
  : `${hostHeader}:39443`

  const baseUrl = `${protocol}://${baseHost}`
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page || "1");
  const size = 10;
  const { cgcProducts, cgcProductsCount } = await getCGCProducts(page, size, q);
  return (
    <Suspense key={q} fallback={<BookListSkeleton count={5} />}>
      <CGCProductListWithPanel products={cgcProducts} baseUrl={baseUrl} />
      <Pagination currentPage={page} totalCount={cgcProductsCount} groupSize={size} searchQuery={q}/>
    </Suspense>
  );
}