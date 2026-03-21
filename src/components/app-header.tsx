"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import style from "@/app/layout.module.css";
import LogoutButton from "@/components/logout";
import ThemeToggle from "@/components/theme-toggle";

export default function AppHeader() {
  const pathname = usePathname();

  if (pathname === "/signin") {
    return (
      <header className={style.header}>
        <div className={style.brand} />
        <div className={style.headerActions}>
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header className={style.header}>
      <Link href="/" className={style.brand}>
        <Image src="/chungicho-logo.png" alt="천기초 로고" width={160} height={36} className={style.brandLogo} priority />
        <span className={style.brandText}>제품리스트(베타)</span>
      </Link>
      <div className={style.headerActions}>
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
