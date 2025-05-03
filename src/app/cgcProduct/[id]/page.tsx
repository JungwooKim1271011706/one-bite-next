import style from "./page.module.css";
import Image from "next/image";
import { CGCproduct } from "@/types";
import { notFound } from "next/navigation";
import { getDriverImageUrl } from "@/util/driver-utils";
import { getGoogleSheet } from "@/app/api/page";

async function CGCProductDetail ({ cgcProductId } : {cgcProductId : string}) {
    const sheet = await getGoogleSheet("가격표");
    const rows = await sheet.getRows();

    const cgcProductGoogleSheet = rows.find(row => row.get("ID") === cgcProductId);
    if (!cgcProductGoogleSheet) {
        notFound();
    }

    const getImageUrls = async (imageA: string, imageB: string) => {
        let imageAUrl = '';
        let imageBUrl = '';
        const seperator = '가격표_Images/';
        if (imageA && imageA.length > 0) {
        imageA = imageA.substring(seperator.length);
        imageAUrl = await getDriverImageUrl(imageA);
        }
        if (imageB && imageB.length > 0) {
        imageB = imageB.substring(seperator.length);
        imageBUrl = await getDriverImageUrl(imageB);
        }
        return {imageAUrl, imageBUrl};
    }

    const cgcProductRawData = cgcProductGoogleSheet.toObject();
    const { imageAUrl, imageBUrl } = await getImageUrls(cgcProductRawData['사진 A'], cgcProductRawData['사진 B']);
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
        imageA: imageAUrl,
        imageB: imageBUrl,
    }

    return (
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
    );
}

export default async function Page({
    params,
} : {
    // params : { id: string}; // params에서 id를 꺼내서 가져와야 함..
    params : Promise<{ id: string}>; // params에서 id를 꺼내서 가져와야 함..
}) {

    const {id = "0"} = await params

    return (
        <div className={style.container}>
            <CGCProductDetail cgcProductId={id} />
        </div>
    )
}