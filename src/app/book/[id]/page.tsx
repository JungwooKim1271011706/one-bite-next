import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";
import { Metadata } from "next";

// 다이나믹 파라미터를 설정하지 않음
// 아래 generateStaticParams 메서드에서 정의하지 않은 파라미터는 허용 안함 => 404
// export const dynamicParams = false;

// 어떤 파라미터를 넘겨줄지 명시. 문자열 데이터만 가능
// 자등으로 넘겨중
// 무조건 정적 페이지로 강제 설정됨 아래 메서드를 사용함
export async function generateStaticParams () {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();

  return books.map((book) => {
    id: book.id.toString();
  })
}

async function BookDetail({ bookId } : { bookId : string}) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound(); // notFound 메서드를 찾아서
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title} 입니다}`}/>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({bookId} : {bookId : string}) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`
    , { next : { tags : [`review-${bookId}`]}}
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] =  await response.json();

  return (
    <section>{reviews.map((review) => 
      <ReviewItem key={`review-item-${review.id}`} {...review} />
    )}</section>
  );
}

export async function generateMetadata({params} : {params : {id : string}}) : Promise<Metadata | null> {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const book:BookData = await response.json();

  return {
    title : `${book.title} - 한입북스`,
    description : `${book.description}`,
    openGraph : {
      title : `${book.title} - 한입북스`,
      description : `${book.description}`,
      images : [book.coverImgUrl],
    }
  }
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {

  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id}/>
      <ReviewList bookId={params.id} />
    </div>
  );
}
