import { prisma } from '@/prisma'
import { Organization, Prisma } from 'generated/prisma'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org = await prisma.organization.create({
      data,
    })

    return org
  }
}
