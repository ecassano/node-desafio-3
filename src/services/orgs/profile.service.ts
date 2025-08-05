import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { Organization } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

interface ProfileServiceRequest {
  orgId: string
}

interface ProfileServiceResponse {
  org: Organization
}

export class ProfileService {
  constructor(private orgsRepository: PrismaOrgsRepository) {}

  async execute({
    orgId,
  }: ProfileServiceRequest): Promise<ProfileServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
