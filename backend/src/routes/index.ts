import express, { Request, Response } from "express";
import { getLogger } from "@/utils/loggers";
import { client } from "../db/dbConnnect.";
import { InvoiceDelete } from "../controllers/InvoiceDelete";
import { invoiceGet, invoiceGetAll } from "../controllers/InvoiceGet";
import { InvoiceCreate, MarkAsPaid } from "../controllers/InvoiceCreate";
import { InvoiceEdit } from "../controllers/InvoiceEdit";
import { sendTestEmail } from "./Mailer";

const router = express.Router();

router.post("/create", InvoiceCreate);

router.post("/send", sendTestEmail, InvoiceCreate);

router.put("/edit/:id", InvoiceEdit);

router.put("/mark/:id", MarkAsPaid);

router.get("/invoice/:id", invoiceGet);

router.get("/invoices", invoiceGetAll);

router.delete("/invoice/delete/:id", InvoiceDelete);

export default router;
