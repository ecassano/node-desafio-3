import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { ProfileService } from './profile.service'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

let orgsRepository: InMemoryOrgsRepository
let sut: ProfileService

describe('Profile Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new ProfileService(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const org = await orgsRepository.create({
      name: 'Test Organization',
      accountable_name: 'Test Accountable',
      email: 'test@test.com',
      whatsapp: '1234567890',
      password_hash: await hash('123456', 6),
      cep: '1234567890',
      state: 'Test State',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      street: 'Test Street',
      complement: 'Test Complement',
    })

    expect(sut.execute({ orgId: org.id })).resolves.toEqual({
      org: expect.objectContaining({
        name: 'Test Organization',
        accountable_name: 'Test Accountable',
        email: 'test@test.com',
        whatsapp: '1234567890',
        cep: '1234567890',
        state: 'Test State',
        city: 'Test City',
      }),
    })
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(
      sut.execute({ orgId: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
