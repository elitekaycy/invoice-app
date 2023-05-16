import express, { Request, Response } from "express";
import { getLogger } from "@/utils/loggers";
import { client } from "../db/dbConnnect.";
import { InvoiceDelete } from "./InvoiceDelete";
import { invoiceGet, invoiceGetAll } from "./InvoiceGet";
import { InvoiceCreate, MarkAsPaid } from "./InvoiceCreate";
import { InvoiceEdit } from "./InvoiceEdit";
import { sendTestEmail } from "./Mailer";

const router = express.Router();

// create invoice router
/* 
  1. takes the invoice from the frontend
  2. validates all the input
  3. creates an invoice and return a list of invoice created sorted by time created
  4. sends back 201 message with created to be true
*/

router.post("/create", InvoiceCreate);

router.post("/send", sendTestEmail, InvoiceCreate);

router.put("/edit/:id", InvoiceEdit);

router.put("/mark/:id", MarkAsPaid);

router.get("/invoice/:id", invoiceGet);

router.get("/invoices", invoiceGetAll);

router.delete("/invoice/delete/:id", InvoiceDelete);

export default router;
