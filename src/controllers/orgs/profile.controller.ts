import { makeProfileService } from '@/services/factories/make-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub } = request.user

  const { org } = await makeProfileService().execute({
    orgId: sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
