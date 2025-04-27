import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData, CGCproduct } from "@/types";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";
import sqlite3 from "sqlite3";
import { json } from "stream/consumers";
import { JWT } from "google-auth-library";
import credential from "../cron/key.json";
// import credential from "../cron/cgcProductkey.json";
import { GoogleSpreadsheet } from "google-spreadsheet";
import CGCProductItem from "@/components/cgcProduct-item";
import Pagination from "@/components/pagiation";

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음.
// 2. force-dynamic : 페이지를 강제로 Dynamic로 설정
// 3. force-static : 페이지를 강제로 static으로 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류 발생)

export const metadata : Metadata = {
  title : "한입 북스",
  description : "한입 북스에 등록된 도서를 만나보세요",
  openGraph : {
    title : "한입 북스",
    description : "한입 북스에 등록된 도서를 만나보세요",
    images : ['/thumbnail.png'],
  }
};

async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache: "force-cache"}
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const allBooks : BookData[] = await response.json();

  return <div>
    {allBooks.map((book) => (<BookItem key={book.id} {...book} />))}
  </div>
}

async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, 
    // {cache : "force-cache"} 무조건적인 캐싱
    {next : { revalidate : 3}} // 시간단위로 캐싱
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const recoBooks : BookData[] = await response.json();

  return <div>
    {recoBooks.map((book) => (<BookItem key={book.id} {...book} />)) }
  </div>
}

/**
 * 천기초의 제품 전체 데이터를 가져온다.
 */

const docId = "1Rq43xTMCat5JpWe_61SBRqpn5lr7BYJ26Weoaqc-U1Q";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
let jwtClient: JWT | null = null;
let cacheDoc: GoogleSpreadsheet | null = null;

export async function getGoogleSheet() : Promise<GoogleSpreadsheet> {
  if (!jwtClient) {
    jwtClient = new JWT ({
        email: credential.client_email,
        key: credential.private_key,
        scopes: SCOPES,
    });
  }

  if (!cacheDoc) {
    const doc = new GoogleSpreadsheet(docId, jwtClient);
    await doc.loadInfo();
    cacheDoc = doc;
  }
  return cacheDoc;
}

async function getCGCproductSize() {
        cacheDoc = await getGoogleSheet();
        const sheet = cacheDoc.sheetsByTitle["가격표"];
        const totalCount = (await sheet.getRows()).length;
        console.log(" >>> " + totalCount);
        return totalCount;
}

async function getCGCproducts(page: number, size: number): Promise<CGCproduct[]> {
        cacheDoc = await getGoogleSheet();
        const sheet = cacheDoc.sheetsByTitle["가격표"];
        const rows = await sheet.getRows({
          offset: (page -1) * size,
          limit: size
        });

        const cgcProduct: CGCproduct[] = rows.map((row) => {
            const itemData = row.toObject();

            return {
                id: Number(itemData['ID']),
                name: itemData['품 명'],
                expirationDate: itemData['유통 기한'],
                expirationDateNewLot: itemData['유통 기한 2 (NEW LOG)'],
                suggestedRetailPrice: itemData['권장 소매가'],
                suggestedWholesalePrice: itemData['권장 도매가'],
                specification: itemData['규 격'],
                category: itemData['구 분'],
                type: itemData['항 목'],
                itemFeatures: itemData['제품 특징'],
                imageA: itemData['사진A'],
                imageB: itemData['사진B'],
            }
        });

        return cgcProduct;
}

async function AllCGCProducts(page: number, size: number) {
    const cgcProducts = await getCGCproducts(page, size);
    return cgcProducts;
}

type Props = {
  searchParams? : {
    page? : string;
  }
}

export default async function Home({searchParams} : Props) {
  const page = Number(searchParams?.page || '1');
  const size = 10;
  const currentPage = Math.max(page, 1);

  const cgcProducts = await AllCGCProducts(currentPage, size);
  const cgcProductsCount = await getCGCproductSize();

  return (
    <div className={style.container}>
      <section>
        <h3>천기초 - 추천리스트</h3>
        <div>추천리스트 추가 필요...(랜덤하게 특정 제품 노출)</div>
          {/* <RecoBooks /> */}
      </section>
      <section>
        <h3>천기초 - 제품리스트</h3>
        {cgcProducts.map(cgcProduct => (
          <CGCProductItem key={cgcProduct.id} {...cgcProduct} />)
        )}
          {/* <AllBooks /> */}
          {/* <AllCGCProducts /> */}
          <Pagination currentPage={currentPage} totalPages={cgcProductsCount} groupSize={10}/>
      </section>
    </div>
  );
}
