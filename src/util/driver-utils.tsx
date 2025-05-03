import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
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