import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { ReactNode } from "react";
import LogoutButton from "@/components/logout";

async function Footer() {
    return <footer>
        <div>COPYRIGHT(C) 2020 cheongicho. CO.LTD ALL RIGHT RESERVED.</div>
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
          <header className={style.header}>
            <Link href={"/"}>📚 천기초 제품리스트(베타버전 V0.1)</Link>
            <LogoutButton/>
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
