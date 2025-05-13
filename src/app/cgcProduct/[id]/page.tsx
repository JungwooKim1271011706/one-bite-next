import style from "./page.module.css";
import Image from "next/image";
import { CGCproduct } from "@/types";
import { notFound } from "next/navigation";
import { getDriverImageUrl } from "@/util/driver-utils";
import { getGoogleSheet } from "@/util/driver-utils";
import { connecttodatabase } from "@/lib/db/mongodb"
import { getCGCProductById, getCGCProducts} from "@/lib/service/CGCProductService";

export default async function Page({
    params,
} : {
    params : Promise<{ id: string}>; // params에서 id를 꺼내서 가져와야 함..
}) {


    const {id = "0"} = await params
    const cgcProduct = await getCGCProductById(Number(id));
    if (!cgcProduct) {
        return <div>id에 해당하는 제품이 없습니다.... 허허ㅎ.</div>
    }
    return (
        <div className={style.container}>
            <section>
                {cgcProduct.imageA.length > 0 && 
                    <div className={style.cover_img_container} style={{ backgroundImage: `url(${cgcProduct.imageA})` }}>
                        <Image src={cgcProduct.imageA} width={240} height={300} alt={`제품 ${cgcProduct.name} 입니다}`}/>
                    </div>
                }
                <div className={style.title}>{cgcProduct.name}</div>
                <div className={style.subTitle}>유통기한 : {cgcProduct.expirationDate}</div>
                <div className={style.author}>권장 소매가 : {cgcProduct.suggestedRetailPrice}</div>
                <div className={style.author}>권장 도매가 : {cgcProduct.suggestedWholesalePrice}</div>
                <div className={style.author}>규격 : {cgcProduct.specification}</div>
                <div className={style.author}>구분 : {cgcProduct.category}</div>
                <div className={style.author}>항목 : {cgcProduct.type}</div>
                <div className={style.description}>{cgcProduct.itemFeatures}</div>
            </section>
        </div>
    )
}