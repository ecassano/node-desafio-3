import { Pet } from 'generated/prisma'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

interface GetPetServiceProps {
  id: string
}

export interface GetPetServiceResponse {
  pet: Pet
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: GetPetServiceProps): Promise<GetPetServiceResponse> {
    const pet = await this.petsRepository.findById(data.id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
