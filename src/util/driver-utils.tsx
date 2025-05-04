import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import sheetcredential from "../app/cron/(org)cgcProductKey.json";
import { JWT } from "google-auth-library";
import path from 'path';
import { google } from 'googleapis';

const docId = "1GIgf9TwfctMrK43Qu0NmI_i0ikOzn7cuPwh--lCgbXQ"; // real
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly", "https://www.googleapis.com/auth/spreadsheets"];
let jwtClient: JWT | null = null;
let cacheDoc: GoogleSpreadsheet | null = null;

const KEY_FILE_PATH = path.join(process.cwd(), "src", "app", "cron", "cgcProductKey.json");
export async function getDriverImageUrl(fileName: string): Promise<string> {
  const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPES,
  })
  const drive = google.drive({ version: "v3", auth});
  const res = await drive.files.list({
    q: `name = '${fileName}' and trashed = false`,
    fields: "files(id, name, thumbnailLink)",
  });
  const files = res.data.files;
  if (!files || files.length === 0) {
    return '';
  }
  const thumbnailLink = files[0].thumbnailLink;
  if (!thumbnailLink) {
    return '';
  }
  return thumbnailLink;
}

/**
 * 키 파일에 대해서 수정 필요
 * @param sheetTitle 
 * @returns 
 */
export async function getGoogleSheet(sheetTitle : string) : Promise<GoogleSpreadsheetWorksheet> {
  if (!jwtClient) {
    jwtClient = new JWT ({
        email: sheetcredential.client_email,
        key: sheetcredential.private_key,
        scopes: SCOPES,
    });
  }

  if (!cacheDoc) {
    const doc = new GoogleSpreadsheet(docId, jwtClient);
    await doc.loadInfo();
    cacheDoc = doc;
  }

  return cacheDoc.sheetsByTitle[sheetTitle];
}

export async function getCGCproductSize() {
    const sheet = await getGoogleSheet("가격표");
    const totalCount = (await sheet.getRows()).length;
    return totalCount;
}