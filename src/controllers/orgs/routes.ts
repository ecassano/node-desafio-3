import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { auth } from './auth.controller'
import { refresh } from './refresh.controller'
import { profile } from './profile.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', register)
  app.post('/sessions', auth)
  app.patch('/sessions/refresh', refresh)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
