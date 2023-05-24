import express, { Request, Response, NextFunction } from "express";
import { InvoiceGetFromClientType } from "@/types";
import { client } from "../db/dbConnnect.";

export const InvoiceEdit = function (
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const newInvoice: InvoiceGetFromClientType = _req?.body;
    const id: any = _req?.params?.id;

    console.log(_req.body);
    console.log("new invoice is ", newInvoice);

    console.log("id is ", id);
    client.query(
      `UPDATE invoice SET clientName = $1, clientEmail = $2, status = $3, paymentDue = $4, paymentTerms = $5, description = $6,
      total = $7 where id = $8 RETURNING id`,
      [
        newInvoice?.clientName,
        newInvoice?.clientEmail,
        newInvoice?.status,
        newInvoice?.paymentDue,
        newInvoice?.paymentTerms,
        newInvoice?.projectDescription,
        newInvoice?.total,
        id,
      ],
      (err, results) => {
        if (err) {
          throw new Error(`${err?.name}: ${err?.message}`);
        }

        const invoiceId = results?.rows[0]?.id;

        // insert both address - if error delete reference
        // insert items - if error delete reference
        const invoiceValues = [
          [
            newInvoice?.clientAddress?.country,
            newInvoice?.clientAddress?.city,
            newInvoice?.clientAddress?.postCode,
            newInvoice?.clientAddress?.streetAddress,
            true,
            invoiceId,
          ],
          [
            newInvoice?.senderAddress?.country,
            newInvoice?.senderAddress?.city,
            newInvoice?.senderAddress?.postCode,
            newInvoice?.senderAddress?.streetAddress,
            false,
            invoiceId,
          ],
        ];

        for (let i = 0; i < invoiceValues?.length; i++) {
          client.query(
            `UPDATE address SET country = $1, city = $2, postcode = $3, street = $4 where invoice_id = $6 AND client = $5`,
            invoiceValues[i],
            (err, result) => {
              if (err) {
                // delete invoice here...
                throw new Error(`${err?.name}: ${err?.message}`);
              }
            }
          );
        }

        newInvoice?.items?.forEach(async (item) => {
          if (!item.id) {
            const addItem = await client.query(
              `INSERT INTO items (name, quantity, price, invoice_id) VALUES ($1, $2, $3, $4)`,
              [item?.itemName, item?.itemQuantity, item?.itemPrice, id]
            );
          } else {
            client.query(
              `UPDATE items SET name = $1, quantity = $2, price = $3 WHERE id = $4`,
              [item?.itemName, item?.itemQuantity, item?.itemPrice, item?.id],
              (err, result) => {
                if (err) {
                  // delete invoice here
                  throw new Error(`${err?.name}: ${err?.message}`);
                }
              }
            );
          }
        });

        // pg closes client automatically
        return res.status(201).json({ edited: true, data: id });
      }
    );
  } catch (err) {
    res.status(400).send(`error occured ${err}`);
  }
};
