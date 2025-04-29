import { CGCproduct } from "@/types";
import style from "./book-item.module.css";
import Link from "next/link";
import Image from "next/image";

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
            <div className={style.container}>
                {imageA &&  <Image src={imageA} alt="썸네일 이미지" width={200} height={200} />}
                <div>
                    {/* {imageA && <img src={imageA} /> <Image src="" />} */}
                    <div className={style.title}>{name}</div>
                    <div className={style.subTitle}>유통 기한 : {expirationDate}</div>
                    <br />
                    <div className={style.author}>권장 소매가 : {suggestedRetailPrice}</div>
                    <div className={style.author}>권장 도매가 : {suggestedWholesalePrice}</div>
                </div>
            </div>
        </Link>
    )
}