import Express, { Request, Response } from "express";
import { client } from "../db/dbConnnect.";

// route controller to delete invoice
export const InvoiceDelete = (_req: Request, res: Response) => {
  const id: any = _req?.params?.id;

  try {
    client.query("DELETE FROM invoice WHERE id = $1", [id], (err, result) => {
      if (err) {
        throw new Error(`caught error at delete ${err?.name}: ${err.message}`);
      }

      return res.status(204);
    });
  } catch (err) {
    console.log(`error caught ${err}`);
  }
};
