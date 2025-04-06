import { CGCproduct } from "@/types";
import style from "./book-item.module.css";
import Link from "next/link";

export default function CGCProductItem({
    id,
    name,
    expirationDate,
    expirationDateNewLot,
    suggestedRetailPrice,
    suggestedWholesalePrice,
    specification,
    category,
    type,
    itemFeatures,
    imageA,
    imageB
} : CGCproduct) {
    return (
        <Link href={`/cgcProduct/${id}`} className={style.container}>
        <div>
            <div className={style.title}>{name}</div>
            <div className={style.subTitle}>유통 기한 : {expirationDate}</div>
            <br />
            <div className={style.author}>권장 소매가 : {suggestedRetailPrice}</div>
            <div className={style.author}>권장 도매가 : {suggestedWholesalePrice}</div>
        </div>
        </Link>
    )
}