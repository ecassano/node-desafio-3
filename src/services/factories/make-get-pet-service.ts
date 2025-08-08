import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetService } from '../pets/get-pet.service'

export const makeGetPetService = () => {
  const petsRepository = new PrismaPetsRepository()
  const getPetService = new GetPetService(petsRepository)

  return getPetService
}
