import { Pet, Prisma } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByOrgId(orgId: string): Promise<Pet[]>
}
