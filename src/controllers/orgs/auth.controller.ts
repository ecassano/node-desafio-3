import { InvalidCredentialsError } from '@/services/errors/invalid-credentials.error'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found.error'
import { makeAuthService } from '@/services/factories/make-auth-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import z, { ZodError } from 'zod'

const authBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = authBodySchema.parse(request.body)

  try {
    const { org } = await makeAuthService().execute({ email, password })

    const token = await reply.jwtSign({}, { sign: { sub: org.id } })

    const refreshToken = await reply.jwtSign({}, { sign: { sub: org.id } })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    } else if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      })
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
      })
    }

    throw error
  }
}
