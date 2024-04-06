import express from "express";

import { ZodError, z } from "zod";

import sheets, { SHEET_ID } from "./sheetsClient.js";

const app = express();

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is requried" }),
  email: z.string().email(),
  phone: z.string(),
  message: z.string().min(1, { message: "Message is required" }),
});

app.use(express.json());

app.use(express.static("public"));

app.post("/send-message", async (req, res) => {
  try {
    const body = contactFormSchema.parse(req.body);

    //object to sheets
    const rows = Object.values(body);

    console.log(rows);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Data!A:D",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: {
        values: [rows],
      },
    });
    res.json({ message: "Data added successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
});

app.listen(5000, () => {
  console.log(`App running on http://localhost:5000`);
});
