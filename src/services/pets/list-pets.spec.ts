import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, it, expect } from 'vitest'
import { ListPetsService } from './list-pets.service'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcrypt'
import { NoPetsFoundError } from '../errors/no-pets-in-city.error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: ListPetsService

describe('List pets service', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new ListPetsService(petsRepository, orgsRepository)

    const { id: orgId } = await orgsRepository.create({
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

    const { id: orgId2 } = await orgsRepository.create({
      name: 'Test Organization 2',
      accountable_name: 'Test Accountable',
      email: 'test@test.com',
      whatsapp: '1234567890',
      password_hash: await hash('123456', 6),
      cep: '1234567890',
      state: 'Test State',
      city: 'Test City 2',
      neighborhood: 'Test Neighborhood',
      street: 'Test Street',
      complement: 'Test Complement',
    })

    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test Description',
      age: 1,
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'LOW_SPACE',
      org_id: orgId,
    })

    await petsRepository.create({
      name: 'Test Pet 2',
      description: 'Test Description 2',
      age: 3,
      size: 'MEDIUM',
      energy_level: 'MEDIUM',
      independence_level: 'MEDIUM',
      environment: 'LARGE_SPACE',
      org_id: orgId,
    })

    await petsRepository.create({
      name: 'Test Pet 3',
      description: 'Test Description 3',
      age: 2,
      size: 'LARGE',
      energy_level: 'HIGH',
      independence_level: 'HIGH',
      environment: 'LARGE_SPACE',
      org_id: orgId2,
    })
  })

  it('should be able to list all pets in a city', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
    })

    expect(pets).toHaveLength(2)
    expect(pets[0].name).toBe('Test Pet')
    expect(pets[1].name).toBe('Test Pet 2')
  })

  it('should not be able to list pets in a city with no pets', async () => {
    await expect(
      sut.execute({
        city: 'Non Existing City',
      })
    ).rejects.toBeInstanceOf(NoPetsFoundError)
  })

  it('should be able to list pets by age', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
      age: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Test Pet')
  })

  it('should be able to list pets by size', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
      size: 'SMALL',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Test Pet')
  })

  it('should be able to list pets by energy level', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
      energy_level: 'LOW',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Test Pet')
  })

  it('should be able to list pets by independence level', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
      independence_level: 'LOW',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Test Pet')
  })

  it('should be able to list pets by environment', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
      environment: 'LOW_SPACE',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Test Pet')
  })

  it('should be able to list pets by city, age, size, energy level, independence level and environment', async () => {
    const { pets } = await sut.execute({
      city: 'Test City',
      age: 1,
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'LOW_SPACE',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Test Pet')
  })
})
