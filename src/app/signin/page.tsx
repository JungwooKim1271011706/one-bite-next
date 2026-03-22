import SignInForm from "./signin-form";
import styles from "./signin.module.css";

type Props = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || "/";

  return (
    <div className={styles.wrap}>
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  );
}
