import { connecttodatabase } from "@/lib/mongodb";
import CGCProduct from "@/models/CgcProduct";
import { getDriverImageUrl, getGoogleSheet } from "@/util/driver-utils";

export async function syncCgcProducts() {
    console.log("배치 작업 수행...");

    /**
     * 1. 구글시트에서 데이터 조회
     * 2. 몽고 DB 데이터와 비교
     * 3. 동기화 작업
     */
    const sheet = await getGoogleSheet("가격표");
    const sheetCgcProducts = await sheet.getRows();
    await connecttodatabase();
    const dbCgcProducts = await CGCProduct.find({});

    const dbCgcProductMap = new Map(dbCgcProducts.map((doc) => [doc.id, doc]));
    const sheetMap = new Map();

    for (const sheetCgcProduct of sheetCgcProducts) {
        const sheetObj = sheetCgcProduct.toObject();
        const sheetId = Number(sheetObj["ID"]);
        if (!sheetId) continue;
        sheetMap.set(sheetId, true);

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
        };

        const dbDoc = dbCgcProductMap.get(sheetId);
        const { imageAUrl, imageBUrl } = await getImageUrls(sheetObj['사진 A'], sheetObj['사진 B']);
        const newCGCProduct = {
            id: sheetId,
            name: sheetObj["품 명"] ?? "",
            expirationDate: sheetObj["유통 기한"] ?? "",
            expirationDateNewLot: sheetObj["유통 기한"] ?? "",
            suggestedRetailPrice: sheetObj["권장 소매가"] ?? "",
            suggestedWholesalePrice: sheetObj["권장 도매가"] ?? "",
            specification: sheetObj["규 격"] ?? "",
            category: sheetObj["구 분"] ?? "",
            type: sheetObj["항 목"] ?? "",
            itemFeatures: sheetObj["제품 특징"] ?? "",
            imageA: imageAUrl,
            imageB: imageBUrl,
        };
        if (!dbDoc) {
            // Insert
            await CGCProduct.create(newCGCProduct);
            console.log("Insert:", sheetId);
        } else {
            // Update if necessary
            const changed = Object.entries(newCGCProduct).some(([key, value]) => {
                return dbDoc[key as keyof typeof newCGCProduct] !== value;
            });

            if (changed) {
                await CGCProduct.updateOne({ id: sheetId }, newCGCProduct);
                console.log("Update:", sheetId);
            }
        }
    }

    // Delete DB records not in sheet
    for (const dbId of dbCgcProductMap.keys()) {
        if (!sheetMap.has(dbId)) {
            await CGCProduct.deleteOne({ id: dbId });
            console.log("Delete:", dbId);
        }
    }

    console.log("배치 작업 종료...");
}
