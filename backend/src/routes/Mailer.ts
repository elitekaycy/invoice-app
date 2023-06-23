import * as nodemailer from "nodemailer";
import { NextFunction, Request, Response } from "express";
import { InvoiceGetFromClientType } from "@/types";
import dotenv from "dotenv";

dotenv.config();

export async function sendTestEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { clientEmail, clientName }: InvoiceGetFromClientType = req.body;

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: String(process.env.MAILER_PWD),
    },
  });

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
