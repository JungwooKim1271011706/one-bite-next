"use client";

import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
  document.body?.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let saved: Theme = "light";
    try {
      saved = (localStorage.getItem("theme") as Theme | null) ?? "light";
    } catch {
      saved = "light";
    }
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const onSetTheme = (next: Theme) => {
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    applyTheme(next);
  };

  return (
    <div className={styles.toggle} role="group" aria-label="테마 전환">
      <button
        type="button"
        className={`${styles.iconBtn} ${theme === "light" ? styles.active : ""}`}
        onClick={() => onSetTheme("light")}
        aria-label="라이트 모드"
        title="라이트 모드"
      >
        ☀️
      </button>
      <button
        type="button"
        className={`${styles.iconBtn} ${theme === "dark" ? styles.active : ""}`}
        onClick={() => onSetTheme("dark")}
        aria-label="다크 모드"
        title="다크 모드"
      >
        🌙
      </button>
    </div>
  );
}
