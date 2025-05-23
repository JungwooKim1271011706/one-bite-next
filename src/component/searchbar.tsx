"use client";

import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"; // app router 버전의 네비게이션

export default function SearchBar() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const onChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSubmit = () => {
        router.push(`/search?q=${search}`);
    };

    return (
        <div>
            <input value={search} onChange={onChangeSearch}/>
            <button onClick={onSubmit}>검색</button>
        </div>
    )
}