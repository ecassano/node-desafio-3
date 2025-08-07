import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import {
  Pet,
  PetEnergyLevel,
  PetIndependenceLevel,
  PetSize,
  PetEnvironment,
} from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

interface CreatePetServiceProps {
  name: string
  description: string
  age: number
  size: PetSize
  energy_level: PetEnergyLevel
  independence_level: PetIndependenceLevel
  environment: PetEnvironment
  org_id: string
}

export interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute(
    data: CreatePetServiceProps
  ): Promise<CreatePetServiceResponse> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
