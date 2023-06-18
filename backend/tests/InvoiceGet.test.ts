import app from "../src/app";
import request from "supertest";

describe("Test suite te test the functionalities of the Get request", () => {
  test("should be able to retrieve all invoices", async () => {
    const response = await request(app).get("/invoices").expect(200);
    const responseBody = response.body;

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(responseBody.data).toBeDefined;
  });

  test("should be able to retrieve single invoice", async () => {
    const parameter = 1;
    const testRequest = (param: number) =>
      request(app).get(`/invoice/${param}`).expect(200);

    const response = await testRequest(parameter);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body.invoice).toBeDefined;
  });
});
