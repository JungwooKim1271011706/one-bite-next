import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from "google-auth-library";
import credential from "../cron/key.json";
import { CGCproduct } from '@/types';
import CGCProductItem from '@/components/cgcProduct-item';

const docId = "1Rq43xTMCat5JpWe_61SBRqpn5lr7BYJ26Weoaqc-U1Q";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const jwt = new JWT ({
    email: credential.client_email,
    key: credential.private_key,
    scopes: SCOPES,
});


export async function getCGCproducts(): Promise<CGCproduct[]> {
        const doc = new GoogleSpreadsheet(docId, jwt);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle["가격표"];
        const rows = await sheet.getRows();

        const cgcProduct: CGCproduct[] = rows.map((row) => {
            const itemData = row.toObject();

            return {
                id: Number(itemData['ID']),
                name: itemData['품 명'],
                expirationDate: itemData['유통 기한'],
                expirationDateNewLot: itemData['유통 기한 2 (NEW LOG)'],
                suggestedRetailPrice: itemData['권장 소매가'],
                suggestedWholesalePrice: itemData['권장 도매가'],
                specification: itemData['규 격'],
                category: itemData['구 분'],
                type: itemData['항 목'],
                itemFeatures: itemData['제품 특징'],
                imageA: itemData['사진A'],
                imageB: itemData['사진B'],
            }
        });

        return cgcProduct;
}


export default async function page() {
    const cgcProducts = await getCGCproducts();
    return (
        <div>
            <h1> 아이템 목록 </h1>
            {cgcProducts.map((item) => (
                <CGCProductItem key={item.id} {...item} />
            ))}
        </div>
    );
}