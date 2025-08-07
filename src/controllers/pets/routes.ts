import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { listPets } from './list-pets.controller'

export const petRoutes = async (app: FastifyInstance) => {
  app.post('/:orgId', { onRequest: [verifyJWT] }, create)
  app.get('/:city', listPets)
}
