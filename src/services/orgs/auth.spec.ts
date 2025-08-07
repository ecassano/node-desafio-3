import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, it, expect } from 'vitest'
import { AuthService } from './auth.service'
import { hash } from 'bcrypt'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthService

describe('Auth Service', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthService(orgsRepository)

    await orgsRepository.create({
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
  })

  it('should be able to authenticate an organization', async () => {
    const { org } = await sut.execute({
      email: 'test@test.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'wrong@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      sut.execute({
        email: 'test@test.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
