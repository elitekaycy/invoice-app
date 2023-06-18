import request from "supertest";
import app from "../src/app"; // Path to your Express app file

describe("Test the root path", () => {
  test("It should respond with 200 status code", async () => {
    const response = await request(app).get("/invoices");
    expect(response.statusCode).toBe(200);
  });
});
