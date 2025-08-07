import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create.service'
import { hash } from 'bcrypt'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetService

describe('Create pet service', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetService(petsRepository, orgsRepository)

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

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Test Pet',
      description: 'Test Description',
      age: 1,
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'LOW_SPACE',
      org_id: orgsRepository.orgs[0].id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Test Pet')
  })

  it('should not be able to create a pet with a non existing organization', async () => {
    await expect(
      sut.execute({
        name: 'Test Pet',
        description: 'Test Description',
        age: 1,
        size: 'SMALL',
        energy_level: 'LOW',
        independence_level: 'LOW',
        environment: 'LOW_SPACE',
        org_id: 'non-existing-org-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
