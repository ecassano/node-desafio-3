import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { listPets } from './list-pets.controller'
import { getPet } from './get-pet.controller'

export const petRoutes = async (app: FastifyInstance) => {
  app.post('/pets/:orgId', { onRequest: [verifyJWT] }, create)
  app.get('/pets/:city', listPets)
  app.get('/pet/:id', getPet)
}
