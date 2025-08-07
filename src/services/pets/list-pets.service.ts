import {
  Pet,
  PetEnergyLevel,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
} from 'generated/prisma'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { NoPetsFoundError } from '../errors/no-pets-in-city.error'

interface ListPetsServiceProps {
  city: string
  age?: number
  size?: PetSize
  energy_level?: PetEnergyLevel
  independence_level?: PetIndependenceLevel
  environment?: PetEnvironment
}

export interface ListPetsServiceResponse {
  pets: Pet[]
}

export class ListPetsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute(data: ListPetsServiceProps): Promise<ListPetsServiceResponse> {
    const { city, age, size, energy_level, independence_level, environment } =
      data

    const orgs = await this.orgsRepository.findManyByCity(city)

    if (!orgs.length) {
      throw new NoPetsFoundError()
    }

    const pets = await Promise.all(
      orgs.map(async org => {
        const pets = await this.petsRepository.findManyByOrgId(org.id)

        return pets
      })
    )

    const filteredPets = pets.flat().filter(pet => {
      if (age && pet.age !== age) return false
      if (size && pet.size !== size) return false
      if (energy_level && pet.energy_level !== energy_level) return false
      if (independence_level && pet.independence_level !== independence_level)
        return false
      if (environment && pet.environment !== environment) return false

      return true
    })

    return { pets: filteredPets }
  }
}
