import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { ReactNode } from "react";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache : "force-cache"}
  );

  if (!response.ok) {
    return <footer>제작 @세상살기힘들어</footer>;
  }

  const books : BookData[] = await response.json();
  const bookCount = books.length;

    return <footer>
        <div>COPYRIGHT(C) 2020 cheongicho. CO.LTD ALL RIGHT RESERVED.</div>
        {/* <div>{bookCount}개의 도서가 등록되어 있습니다.</div> */}
      </footer>;
}

// app router 기반에서 루트에 해당하는 레이아웃을 담당함...
// export default 자체가, 해당 타입스크립트에서 페이지에 렌더링하는 리액트 컴포넌트를 의미하는듯?
export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal : ReactNode
}>) {
  return ( // page.tsx는 레이아웃의 children에 하나씩 담긴다.
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 천기초 제품리스트(베타버전 V0.1)</Link>
          </header>
          <main>{children}</main> 
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
