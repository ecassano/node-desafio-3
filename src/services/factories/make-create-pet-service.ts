import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../pets/create.service'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export const makeCreatePetService = () => {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const createPetService = new CreatePetService(petsRepository, orgsRepository)

  return createPetService
}
