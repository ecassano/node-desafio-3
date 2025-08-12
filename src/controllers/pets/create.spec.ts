import { app } from '@/app'
import { createAndAuthOrg } from '@/utils/test/create-and-auth-org'
import { getOrgProfile } from '@/utils/test/get-org-profile'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Create Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthOrg(app)

    const org = await getOrgProfile(app, token)

    const response = await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Pet',
        description: 'Test Description',
        age: 1,
        size: 'SMALL',
        energy_level: 'LOW',
        independence_level: 'LOW',
        environment: 'LOW_SPACE',
        org_id: org.id,
      })

    expect(response.status).toBe(201)
  })
})
