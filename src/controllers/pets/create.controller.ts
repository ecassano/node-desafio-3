import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  PetEnergyLevel,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
} from 'generated/prisma'
import z from 'zod'

const createPetParamsSchema = z.object({
  orgId: z.string(),
})

const createPetBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  age: z.number(),
  size: z.enum(PetSize),
  energy_level: z.enum(PetEnergyLevel),
  independence_level: z.enum(PetIndependenceLevel),
  environment: z.enum(PetEnvironment),
})

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { orgId } = createPetParamsSchema.parse(request.params)
  const {
    age,
    description,
    energy_level,
    independence_level,
    name,
    size,
    environment,
  } = createPetBodySchema.parse(request.body)

  await makeCreatePetService().execute({
    age,
    description,
    energy_level,
    independence_level,
    name,
    size,
    environment,
    org_id: orgId,
  })

  return reply.status(201).send({
    message: 'Pet created successfully',
  })
}
