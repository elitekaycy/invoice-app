import Express, { Request, Response } from "express";
import { client } from "../db/dbConnnect.";
import { InvoiceSendToClientType } from "@/types";

// GET TABLE DATA
// use data id to get all the data that is relating to the invoice data -
// make sure it corresponds with the invoice_data types

export const invoiceGet = async (_req: Request, res: Response) => {
  const id: any = _req?.params.id;

  try {
    // get the queries all at once
    const getInvoice = await client.query(
      "SELECT * FROM invoice WHERE id = $1",
      [id]
    );
    const getAddress = await client.query(
      "SELECT * FROM address WHERE invoice_id = $1",
      [id]
    );
    const getItems = await client.query(
      "SELECT * FROM items where invoice_id = $1",
      [id]
    );

    if (getInvoice && getAddress && getItems) {
      const clientAddress = getAddress.rows.filter(
        (row) => row?.client === true
      )[0];
      const senderAddress = getAddress.rows.filter(
        (row) => row?.client === false
      )[0];

      const sendInvoice: InvoiceSendToClientType = {
        ...getInvoice.rows[0],
        clientAddress: { ...clientAddress },
        senderAddress: { ...senderAddress },
        items: [...getItems.rows],
      };

      res.status(200).json({ invoice: sendInvoice });
    }
  } catch (err) {
    res.status(400).send(`error occured ${err}`);
  }
};

export const invoiceGetAll = async (_req: Request, res: Response) => {
  try {
    client.query("SELECT * FROM invoice", (err, result) => {
      if (err) {
        throw new Error(`error ${err?.name}: ${err?.message}`);
      }

      res.status(200).json({ data: result?.rows });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(`error occured ${err}`);
  }
};
