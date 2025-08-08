import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetService } from './get-pet.service'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcrypt'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetService

describe('Get pet service', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetService(petsRepository)
  })

  it('should be able to get a pet', async () => {
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

    const { id } = await petsRepository.create({
      name: 'Buddy',
      description: 'Buddy is a friendly dog',
      age: 1,
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'LOW_SPACE',
      org_id: org.id,
    })

    const { pet } = await sut.execute({
      id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        description: 'Buddy is a friendly dog',
      })
    )
  })

  it('should not be able to get a pet with invalid id', async () => {
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

    await petsRepository.create({
      name: 'Buddy',
      description: 'Buddy is a friendly dog',
      age: 1,
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'LOW_SPACE',
      org_id: org.id,
    })

    await expect(
      sut.execute({
        id: 'invalid-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
