import { Organization, Prisma } from 'generated/prisma'

export interface OrgsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
}
