import request from "supertest";
import app from "../src/server";
import "../jest.setup";

describe("Index route handler", () => {
  it("Should get 200 for GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});

describe("Auth route handlers", () => {
  it("Should sign up a new user with POST /auth/signup", async () => {
    const res = await request(app).post("/auth/signup").send({
      username: "test@user",
      password: "testpass",
    });
    console.log(`Message: ${res.body.message}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("Should sign in an existing user with POST /auth/signin", async () => {
    const res = await request(app).post("/auth/signin").send({
      username: "harsh",
      password: "harsh",
    });
    console.log(`Message: ${res.body.message}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
