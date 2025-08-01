import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthService } from '../orgs/auth.service'

export const makeAuthService = () => {
  const orgsRepository = new PrismaOrgsRepository()
  const authService = new AuthService(orgsRepository)

  return authService
}
