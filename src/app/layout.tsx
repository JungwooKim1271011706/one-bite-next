import "./globals.css";
import style from "./layout.module.css";
import { ReactNode } from "react";
import AppHeader from "@/components/app-header";

async function Footer() {
  return (
    <footer>
      <div>COPYRIGHT(C) 2020 cheongicho. CO.LTD ALL RIGHT RESERVED.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <AppHeader />
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
