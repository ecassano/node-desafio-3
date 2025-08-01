import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterService } from './register.service'
import { compare } from 'bcrypt'
import { OrgAlreadyExistsError } from '../errors/org-already-exists.error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterService(orgsRepository)
  })

  it('should be able to register a new organization', async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'test@test.com'

    await sut.execute({
      name: 'Test Organization',
      accountable_name: 'Test Accountable',
      email,
      whatsapp: '1234567890',
      password: '123456',
      cep: '1234567890',
      state: 'Test State',
      city: 'Test City',
      neighborhood: 'Test Neighborhood',
      street: 'Test Street',
      complement: 'Test Complement',
    })

    await expect(
      sut.execute({
        name: 'Test Organization',
        accountable_name: 'Test Accountable',
        email,
        whatsapp: '1234567890',
        password: '123456',
        cep: '1234567890',
        state: 'Test State',
        city: 'Test City',
        neighborhood: 'Test Neighborhood',
        street: 'Test Street',
        complement: 'Test Complement',
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
