"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./signin.module.css";

type Props = {
  callbackUrl: string;
};

export default function SignInForm({ callbackUrl }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trimmedId = id.trim();
  const canSubmit = useMemo(() => trimmedId.length > 0 && password.length > 0 && !loading, [trimmedId, password, loading]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!trimmedId || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      id: trimmedId,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res?.ok) {
      // 모바일 브라우저 쿠키 반영 타이밍 이슈 회피용 하드 리다이렉트
      window.location.href = callbackUrl;
      return;
    }

    setLoading(false);
    setError("아이디 또는 비밀번호를 확인해주세요.");
  };

  return (
    <form className={styles.card} onSubmit={onSubmit}>
      <div className={styles.logoArea}>
        <Image src="/chungicho-logo.png" alt="천기초 로고" width={220} height={50} priority />
      </div>
      <h1 className={styles.title}>로그인</h1>

      <label className={styles.label} htmlFor="signin-id">아이디</label>
      <input
        id="signin-id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className={styles.input}
        autoComplete="username"
        autoFocus
        disabled={loading}
      />

      <label className={styles.label} htmlFor="signin-password">비밀번호</label>
      <div className={styles.passwordRow}>
        <input
          id="signin-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          autoComplete="current-password"
          disabled={loading}
        />
        <button
          type="button"
          className={styles.eyeBtn}
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={loading}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          title={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      {error ? (
        <p className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      ) : null}

      <button className={styles.submit} type="submit" disabled={!canSubmit}>
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
