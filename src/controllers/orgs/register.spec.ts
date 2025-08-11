import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Register", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a new organization", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Test Organization",
      accountable_name: "Test Accountable",
      email: "test@test.com",
      whatsapp: "1234567890",
      password: "123456",
      cep: "1234567890",
      state: "Test State",
      city: "Test City",
      neighborhood: "Test Neighborhood",
      street: "Test Street",
      complement: "Test Complement",
    });

    expect(response.status).toBe(201);
  });
});
