import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from "google-auth-library";
// import credential from "../cron/key.json";
import credential from "../cron/cgcProductKey.json";
import sheetcredential from "../cron/(org)cgcProductKey.json";
import path from 'path';
import { google } from 'googleapis';
import { file } from 'googleapis/build/src/apis/file';

/**
 * 천기초의 제품 전체 데이터를 가져온다.
 */
// const docId = "1GIgf9TwfctMrK43Qu0NmI_i0ikOzn7cuPwh--lCgbXQ"; // real

// const KEY_FILE_PATH = path.join(process.cwd(), "src", "app", "cron", "cgcProductKey.json");

// export async function getDriverImageUrl(fileName: string): Promise<string> {
//   const auth = new google.auth.GoogleAuth({
//       keyFile: KEY_FILE_PATH,
//       scopes: SCOPES,
//   })
//   const drive = google.drive({ version: "v3", auth});
//   const res = await drive.files.list({
//     q: `name = '${fileName}' and trashed = false`,
//     fields: "files(id, name, thumbnailLink)",
//   });
//   const files = res.data.files;
//   if (!files || files.length === 0) {
//     return '';
//   }
//   const thumbnailLink = files[0].thumbnailLink;
//   if (!thumbnailLink) {
//     return '';
//   }
//   return thumbnailLink;
// }
