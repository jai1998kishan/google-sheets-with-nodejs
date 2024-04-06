import { google } from "googleapis";

import key from "../secrets.json" assert { type: "json" };

export const SHEET_ID = "15S2iBBm7IuIhLg-w2P19Uobwmv-KP_L-qNhJbNVxA0k";

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const sheets = google.sheets({ version: "v4", auth: client });

export default sheets;
