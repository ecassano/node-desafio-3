import { makeGetPetService } from '@/services/factories/make-get-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

const getPetParamsSchema = z.object({
  id: z.string(),
})

export const getPet = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = getPetParamsSchema.parse(request.params)

  const { pet } = await makeGetPetService().execute({
    id,
  })

  return reply.status(200).send({
    pet,
  })
}
