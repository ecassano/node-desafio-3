import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'

export const petRoutes = async (app: FastifyInstance) => {
  app.post('/:orgId', { onRequest: [verifyJWT] }, create)
}
