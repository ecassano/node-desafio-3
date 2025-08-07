import { Pet, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyByOrgId(orgId: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: orgId,
      },
    })

    return pets
  }
}
