import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagiation";
import { getCGCProducts } from "@/lib/service/CGCProductService";
import Link from "next/link";
import style from "./search-page.module.css";

// async function SearchResult({q, page} : {q : string; page : number}) {
//   const size = 10;
//   const sheets = await getGoogleSheet("가격표");
//   const rows = await sheets.getRows();
//   const searchRows = rows.filter((row) => {
//     const itemName = row.toObject()['품 명']?.toString()?.toLowerCase() || '';
//     return itemName.includes(q.toLowerCase());
//   });

//   const totalCount = searchRows.length;
//   const pagedItems = searchRows.slice((page -1) * size, page * size);


//   const getImageUrls = async (imageA: string, imageB: string) => {
//     let imageAUrl = '';
//     let imageBUrl = '';
//     const seperator = '가격표_Images/';
//     if (imageA && imageA.length > 0) {
//       imageA = imageA.substring(seperator.length);
//       imageAUrl = await getDriverImageUrl(imageA);
//     }
//     if (imageB && imageB.length > 0) {
//       imageB = imageB.substring(seperator.length);
//       imageBUrl = await getDriverImageUrl(imageB);
//     }
//     return {imageAUrl, imageBUrl};
//   };

//   const cgcProducts: CGCproduct[] = await Promise.all(pagedItems.map(async (row) => {
//     const itemData = row.toObject();

//     // console.log(itemData['사진 A']);
//     const { imageAUrl, imageBUrl } = await getImageUrls(itemData['사진 A'], itemData['사진 B']);

//     return {
//         id: Number(itemData['ID']),
//         name: itemData['품 명'],
//         expirationDate: itemData['유통 기한'],
//         expirationDateNewLot: itemData['유통 기한 2 (NEW LOG)'],
//         suggestedRetailPrice: itemData['권장 소매가'],
//         suggestedWholesalePrice: itemData['권장 도매가'],
//         specification: itemData['규 격'],
//         category: itemData['구 분'],
//         type: itemData['항 목'],
//         itemFeatures: itemData['제품 특징'],
//         imageA: imageAUrl,
//         imageB: imageBUrl,
//     }
//   }));

//   return (
//     <div>
//       {cgcProducts.map((item, index) => (
//         <CGCProductItem key={index} {...item} />
//       ))}

//       <Pagination currentPage={page} totalCount={totalCount} groupSize={10} searchQuery={q}/>
//     </div>
//   );
// }

type Props = {
  searchParams : Promise<{
    q? : string,
    page? : number}>;
}
// type Props = {
//   searchParams: URLSearchParams;
// };

// export async function generateMetadata({ searchParams }:{searchParams : { q? : string}}): Promise<Metadata> {
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
      <section className={style.summary}>
        <div className={style.field}>
          <span className={style.label}>검색어</span>
          <strong>{q || "-"}</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>검색 결과</span>
          <strong>{cgcProductsCount}건</strong>
        </div>
        <div className={style.field}>
          <span className={style.label}>현재 페이지</span>
          <strong>{pageNumber}</strong>
        </div>
        <Link href="/" className={style.resetLink}>전체 목록</Link>
      </section>
      <div className={style.results}>
        {cgcProducts.map((cgcProduct) => (
          <CGCProductItem key={cgcProduct.id} {...cgcProduct} />)
        )}
      </div>
      <Pagination currentPage={pageNumber} totalCount={cgcProductsCount} groupSize={size} searchQuery={q}/>
      {/* <SearchResult q={q} page={pageNumber} /> */}
  </Suspense>
  );
}
