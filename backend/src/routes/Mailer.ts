import * as nodemailer from "nodemailer";
import { NextFunction, Request, Response } from "express";
import { InvoiceGetFromClientType } from "@/types";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import { client } from "../db/dbConnnect.";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: String(process.env.MAILER_PWD),
  },
});

export async function sendTestEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { clientEmail, clientName }: InvoiceGetFromClientType = req.body;

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: clientEmail,
    subject: `Invoice to ${clientName}`,
    text: `new invoice created awaiting approval ${req.protocol}://${req.get(
      "host"
    )}invoice`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      req.body.emailSent = false;
      next();
    } else {
      req.body.email = info.response;
      req.body.emailSent = true;
      next();
    }
  });
}

// create pdf
export const generatePdf = async (query: string) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: any = [];

    // Execute the query
    client.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        result.rows.forEach((row) => {
          doc.fontSize(12).text(JSON.stringify(row));
        });

        doc.on("data", (chunk) => {
          buffers.push(chunk);
        });

        doc.on("end", () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        doc.end();
      }
    });
  });
};

// send mail to client upon create
// Function to send email with PDF attachment
export async function sendEmailWithAttachment(
  pdfBuffer: any,
  recipientEmail: string
) {
  console.log(recipientEmail, "this email is in email attachment");
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: recipientEmail,
    subject: "Pdf of invoices paid",
    text: "This is the list of all invoices paid in full",
    attachments: [
      {
        filename: "invoicePaid.pdf",
        content: pdfBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
}
