import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Refresh', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Test Organization',
      accountable_name: 'Test Accountable',
      email: 'test@test.com',
      whatsapp: '1234567890',
      password: '123456',
      cep: '1234567890',
      state: 'Test State',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      street: 'Test Street',
      complement: 'Test Complement',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'test@test.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/sessions/refresh')
      .set('Cookie', cookies!)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
