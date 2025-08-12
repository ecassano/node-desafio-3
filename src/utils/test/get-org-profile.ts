import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const getOrgProfile = async (app: FastifyInstance, token: string) => {
  const meResponse = await request(app.server)
    .get('/me')
    .set('Authorization', `Bearer ${token}`)

  const { org } = meResponse.body

  return org
}
