import { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true })

  const { sub } = request.user

  const token = await reply.jwtSign({
    sign: {
      sub,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub,
      expiresIn: '7d',
    },
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
    .status(200)
    .send({
      token,
    })
}
