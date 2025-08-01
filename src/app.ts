import fastify from 'fastify'
import { env } from './env'
import { orgRoutes } from './controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '20m',
  },
})

app.register(orgRoutes)
