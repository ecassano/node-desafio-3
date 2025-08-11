import { prisma } from "@/prisma";
import { FastifyInstance } from "fastify";
import { hash } from "bcrypt";
import request from "supertest";

export async function createAndAuthOrg(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: "Test Organization",
      accountable_name: "Test Accountable",
      email: "test@test.com",
      whatsapp: "1234567890",
      password_hash: await hash("123456", 6),
      cep: "1234567890",
      state: "Test State",
      city: "Test City",
      neighborhood: "Test Neighborhood",
      street: "Test Street",
      complement: "Test Complement",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "test@test.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
