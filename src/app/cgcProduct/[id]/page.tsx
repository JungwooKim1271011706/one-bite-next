import { getGoogleSheet } from "@/app/(with-searchbar)/page";
import style from "./page.module.css";
import Image from "next/image";
import { CGCproduct } from "@/types";
import { notFound } from "next/navigation";

async function CGCProductDetail ({ cgcProductId } : {cgcProductId : string}) {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle["가격표"];
    const rows = await sheet.getRows();

    const cgcProductGoogleSheet = rows.find(row => row.get("ID") === cgcProductId);
    if (!cgcProductGoogleSheet) {
        notFound();
    }

    const cgcProductRawData = cgcProductGoogleSheet.toObject();
    const cgcProduct: CGCproduct = {
        id: Number(cgcProductRawData['ID']),
        name: cgcProductRawData['품 명'],
        expirationDate: cgcProductRawData['유통 기한'],
        expirationDateNewLot: cgcProductRawData['유통 기한 2 (NEW LOG)'],
        suggestedRetailPrice: cgcProductRawData['권장 소매가'],
        suggestedWholesalePrice: cgcProductRawData['권장 도매가'],
        specification: cgcProductRawData['규 격'],
        category: cgcProductRawData['구 분'],
        type: cgcProductRawData['항 목'],
        itemFeatures: cgcProductRawData['제품 특징'],
        imageA: cgcProductRawData['사진A'],
        imageB: cgcProductRawData['사진B'],
    }


    return (
        <section>
        <div
            className={style.cover_img_container}
            style={{ backgroundImage: `url('1111')` }}
        >
            {/* <Image src={imageA} width={240} height={300} alt={`제품 ${name} 입니다}`}/> */}
        </div>
        <div className={style.title}>{cgcProduct.name}</div>
        <div className={style.subTitle}>{cgcProduct.expirationDate}</div>
        <div className={style.author}>권장 소매가 : {cgcProduct.suggestedRetailPrice}</div>
        <div className={style.author}>권장 도매가 : {cgcProduct.suggestedWholesalePrice}</div>
        <div className={style.author}>규격 : {cgcProduct.specification}</div>
        <div className={style.author}>구분 : {cgcProduct.category}</div>
        <div className={style.author}>항목 : {cgcProduct.type}</div>
        <div className={style.description}>{cgcProduct.itemFeatures}</div>
        </section>
    );
}

export default function Page({
    params,
} : {
    params : { id: string}; // params에서 id를 꺼내서 가져와야 함..
}) {
    return (
        <div className={style.container}>
            <CGCProductDetail cgcProductId={params.id} />
        </div>
    )
}