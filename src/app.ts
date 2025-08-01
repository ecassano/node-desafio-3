import fastify from 'fastify'
import { env } from './env'
import { orgRoutes } from './controllers/orgs/routes'

export const app = fastify()

app.register(orgRoutes)
