import request from "supertest";
import app from "../src/app"; // Path to your Express app file
import { InvoiceGetFromClientType } from "@/types";
import { response } from "express";

// data full - test pass - pass - 200 - data returned
// data not full - fail - 400 - data not returned
// invalid email - fail - invalid status codd - failed message returned

// test updating the database

// since typecript is being used here we can limit the number of tests to 3

describe("invoice create test file", () => {
  test("It should create a new invoice with the appropiate information", async () => {
    const invoice: InvoiceGetFromClientType = {
      clientName: "Dickson Anyaele",
      clientAddress: {
        city: "Accra",
        streetAddress: "SV5 soveriegn street",
        postCode: "02233",
        country: "ghana",
      },
      senderAddress: {
        city: "Accra",
        streetAddress: "SV5 soveriegn street",
        postCode: "02233",
        country: "ghana",
      },
      clientEmail: "dicksonanyaele1234@gmail.com",
      status: "draft",
      paymentDue: "22-01-22",
      paymentTerms: 30,
      projectDescription: "A dummy invoice to test route",
      items: [
        {
          itemName: "Test 1",
          itemPrice: 500,
          itemQuantity: "1",
        },
      ],
      total: 500,
    };

    const response = await request(app)
      .post("/create")
      .send(invoice)
      .expect(201);

    const createdInvoice = response.body;

    // tests
    // expect id to be returned
    expect(response.status).toBe(201);
    expect(createdInvoice.status).toBeDefined;
    expect(createdInvoice.invoiceid).toBeDefined;
    expect(createdInvoice.status).toBe(201);
  });

  test("test should fail it the email is invalid", async () => {
    // send invoice but with invalid email
    const invoice: InvoiceGetFromClientType = {
      clientName: "Dickson Anyaele",
      clientAddress: {
        city: "Accra",
        streetAddress: "SV5 soveriegn street",
        postCode: "02233",
        country: "ghana",
      },
      senderAddress: {
        city: "Accra",
        streetAddress: "SV5 soveriegn street",
        postCode: "02233",
        country: "ghana",
      },
      clientEmail: "dicksonanyaele1234",
      status: "draft",
      paymentDue: "22-01-22",
      paymentTerms: 30,
      projectDescription: "A dummy invoice to test route",
      items: [
        {
          itemName: "Test 1",
          itemPrice: 500,
          itemQuantity: "1",
        },
      ],
      total: 500,
    };

    const res = await request(app).post("/create").send(invoice).expect(400);
    const responseBody = res.body;

    expect(res.status).toBe(400);
    expect(responseBody).toThrowError;
  });
});
