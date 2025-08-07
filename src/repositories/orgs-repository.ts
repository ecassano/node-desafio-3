import { Organization, Prisma } from 'generated/prisma'

export interface OrgsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findManyByCity(city: string): Promise<Organization[]>
}
