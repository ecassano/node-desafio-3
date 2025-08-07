import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  PetEnergyLevel,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
} from 'generated/prisma'
import { makeListPetsService } from '@/services/factories/make-list-pets-service'

const listPetsParamsSchema = z.object({
  city: z.string().min(1, { message: 'City is required' }),
})

const listPetsQuerySchema = z.object({
  age: z.coerce.number().optional(),
  size: z.enum(PetSize).optional(),
  energy_level: z.enum(PetEnergyLevel).optional(),
  independence_level: z.enum(PetIndependenceLevel).optional(),
  environment: z.enum(PetEnvironment).optional(),
})

export const listPets = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { city } = listPetsParamsSchema.parse(request.params)
  const { age, energy_level, environment, independence_level, size } =
    listPetsQuerySchema.parse(request.query)

  const { pets } = await makeListPetsService().execute({
    city,
    age,
    energy_level,
    environment,
    independence_level,
    size,
  })

  return reply.status(200).send({
    pets,
  })
}
