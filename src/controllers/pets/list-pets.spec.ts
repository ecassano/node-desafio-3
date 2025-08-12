import { app } from '@/app'
import { createAndAuthOrg } from '@/utils/test/create-and-auth-org'
import { getOrgProfile } from '@/utils/test/get-org-profile'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('List Pets', () => {
  let token: string
  let org: any

  beforeAll(async () => {
    await app.ready()

    const authResult = await createAndAuthOrg(app)
    token = authResult.token
    org = await getOrgProfile(app, token)

    await request(app.server)
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

    await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Pet 2',
        description: 'Test Description 2',
        age: 2,
        size: 'MEDIUM',
        energy_level: 'MEDIUM',
        independence_level: 'MEDIUM',
        environment: 'MODERATE_SPACE',
        org_id: org.id,
      })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets by city', async () => {
    const response = await request(app.server).get(`/pets/${org.city}`)

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test Pet',
        }),
        expect.objectContaining({
          name: 'Test Pet 2',
        }),
      ])
    )
  })

  it('should be able to list pets by city, age, size, energy_level, independence_level and environment', async () => {
    const response = await request(app.server).get(
      `/pets/${org.city}?age=1&size=SMALL&energy_level=LOW&independence_level=LOW&environment=LOW_SPACE`
    )

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test Pet',
        }),
      ])
    )
  })
})
