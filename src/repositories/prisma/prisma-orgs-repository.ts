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

  async findByEmail(email: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
