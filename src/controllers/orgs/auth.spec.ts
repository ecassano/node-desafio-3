import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Auth', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an organization', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'test@test.com',
      password: '123456',
    })

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
