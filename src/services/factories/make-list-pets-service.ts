import { ListPetsService } from '../pets/list-pets.service'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export const makeListPetsService = () => {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const listPetsService = new ListPetsService(petsRepository, orgsRepository)

  return listPetsService
}
