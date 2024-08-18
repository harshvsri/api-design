import request from "supertest";
import app from "../src/server";

describe("Index route handler", () => {
  it("Should get 200 for GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});
