import { Suspense } from "react";
import SignInForm from "./signin-form";
import styles from "./signin.module.css";

export default function SignInPage() {
  return (
    <div className={styles.wrap}>
      <Suspense fallback={<div className={styles.card}>로딩중...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
