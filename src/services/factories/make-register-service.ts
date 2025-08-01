import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterService } from '../orgs/register.service'

export const makeRegisterService = () => {
  const orgsRepository = new PrismaOrgsRepository()
  const registerService = new RegisterService(orgsRepository)

  return registerService
}
