import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { ProfileService } from '../orgs/profile.service'

export const makeProfileService = () => {
  const orgsRepository = new PrismaOrgsRepository()
  const profileService = new ProfileService(orgsRepository)

  return profileService
}
