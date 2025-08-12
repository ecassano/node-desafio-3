import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthOrg } from '@/utils/test/create-and-auth-org'
import request from 'supertest'

describe('Profile', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get an organization's profile", async () => {
    const { token } = await createAndAuthOrg(app)

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.org).toEqual(
      expect.objectContaining({
        name: 'Test Organization',
        email: 'test@test.com',
      })
    )
  })
})
