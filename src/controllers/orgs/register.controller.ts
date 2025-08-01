import { makeRegisterService } from '@/services/factories/make-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string(),
  accountable_name: z.string(),
  email: z.email(),
  whatsapp: z.string(),
  password: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  complement: z.string().optional(),
})

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    name,
    accountable_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    complement,
  } = registerSchema.parse(request.body)

  try {
    makeRegisterService().execute({
      name,
      accountable_name,
      email,
      whatsapp,
      password,
      cep,
      state,
      city,
      neighborhood,
      street,
      complement: complement ?? null,
    })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }

  return reply.status(201).send({
    message: 'Organization created successfully',
  })
}
