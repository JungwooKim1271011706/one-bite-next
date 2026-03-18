import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";
import CategoryFilter from "@/components/CategoryFilter";
import { getCGCCategories } from "@/lib/service/CGCProductService";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getCGCCategories();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      <CategoryFilter categories={categories} />
      {children}
    </div>
  );
}
