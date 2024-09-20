
"use server";
import { revalidatePath, revalidateTag } from "next/cache";

 // 서버에서만 실행하는 코드.

export async function createReviewAction (_ : any, formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return {
      status : false,
      error : "리뷰 내용과 작성자를 입력해주세요."
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body : JSON.stringify({bookId, content, author})
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // // 페이지 재검증 메서드
    // // next.js에서 해당 URL을 캐시에서 재검증 => 수정 사항이 있으면 렌더링
    // // 서버측에서만 호출 가능, 렌더링 시, 풀라우트 캐시 / 데이터 캐시에 대해서는 전부 무효화됌
    // // 1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // // 2. 특정 경로의 모든 동적 페이지가 재검증
    // revalidatePath(`/book/${bookId}`, "page");

    // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath(`/(with-searchbar)`, "layout");

    // // 4. 모든 데이터 재검증
    // revalidatePath(`/`, "layout");

    // 5. 태그 기준. 데이터 캐싱 재검증
    // fetch 메서드에 대한 태그를 지정하면, 해당 fetch 메서드의 범위에서만 재검증함
    revalidateTag(`review-${bookId}`);
    return {
      status : true,
      error : ""
    }

  } catch (err) {
    return {
      status : false,
      error : `리뷰 저장에 실패했습니다 : ${err}`
    };
  }
}