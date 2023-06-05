import request from "supertest";
import app from "../src/app"; // Path to your Express app file

// data full - test pass - pass - 200 - data returned
// data not full - fail - 400 - data not returned
// invalid email - fail - invalid status codd - failed message returned

// test updating the database

describe("invoice create test file", () => {
  test("this is the starter dummy test to check if file works", () => {
    expect(true).toBe(true);
  });
});
