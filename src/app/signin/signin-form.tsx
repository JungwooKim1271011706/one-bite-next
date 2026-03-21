"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./signin.module.css";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      id,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.ok) {
      router.push(callbackUrl);
      return;
    }

    setError("아이디 또는 비밀번호를 확인해주세요.");
  };

  return (
    <form className={styles.card} onSubmit={onSubmit}>
      <div className={styles.logoArea}>
        <Image src="/chungicho-logo.png" alt="천기초 로고" width={220} height={50} priority />
      </div>
      <h1 className={styles.title}>로그인</h1>

      <label className={styles.label}>아이디</label>
      <input value={id} onChange={(e) => setId(e.target.value)} className={styles.input} autoComplete="username" />

      <label className={styles.label}>비밀번호</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} autoComplete="current-password" />

      {error ? <p className={styles.error}>{error}</p> : null}

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
