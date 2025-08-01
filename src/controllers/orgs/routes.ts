import { FastifyInstance } from 'fastify'
import { register } from './register.controller'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', register)
}
