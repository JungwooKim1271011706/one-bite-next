"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

type Props = {
  className?: string;
  placeholder?: string;
};

export default function Searchbar({
  className = "",
  placeholder = "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");
  const category = searchParams.get("category");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    const nextSearch = search.trim();

    if (!nextSearch) {
      if (category) {
        router.push(`/?category=${encodeURIComponent(category)}&page=1`);
        return;
      }
      router.push("/");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", nextSearch);
    params.set("page", "1");
    if (category) {
      params.set("category", category);
    }

    router.push(`/search?${params.toString()}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={`${style.container} ${className}`.trim()}>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <button onClick={onSubmit}>{"\uAC80\uC0C9"}</button>
    </div>
  );
}
