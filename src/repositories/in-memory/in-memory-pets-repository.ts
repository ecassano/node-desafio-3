import { Pet, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findManyByOrgId(orgId: string): Promise<Pet[]> {
    const pets = this.pets.filter(pet => pet.org_id === orgId)

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find(pet => pet.id === id)

    return pet ?? null
  }
}
