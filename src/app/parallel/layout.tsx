import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({children, peed, sidebar} : 
    {children : ReactNode; sidebar : ReactNode; peed : ReactNode}) {
    return (
        <div>
            <div>
                <Link href={"/parallel"}>parallel</Link>
                &nbsp;
                <Link href={"/parallel/setting"}>parallel/setting</Link>
            </div>
            <br />
            {sidebar}
            {peed}
            {children}
        </div>
    );
}