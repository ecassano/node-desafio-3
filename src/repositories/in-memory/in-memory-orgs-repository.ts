import { Organization, Prisma } from 'generated/prisma'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org = {
      ...data,
      id: randomUUID(),
      complement: data.complement ?? null,
    }

    this.orgs.push(org)

    return org
  }
}
