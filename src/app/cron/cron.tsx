import { NextApiRequest, NextApiResponse } from 'next';
import cron from 'node-cron';
import google from 'googleapis';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from "google-auth-library";
import credential from "./key.json";

/**
 * 필요 변수 선언
 */
const jwt = new JWT({});
const docId = "";


cron.schedule('0 0 * * *', () => {
    console.log("배치 작업 수행...");
})

export default async function loadGoogleSheet() {
    const doc = new GoogleSpreadsheet(docId, jwt);
    await doc.loadInfo();
    return doc;
}

// export default async function googleOAuth(req: NextApiRequest, res : NextApiResponse) {


// }