import { OrgsRepository } from '@/repositories/orgs-repository'
import { Prisma } from 'generated/prisma'
import { hash } from 'bcrypt'

interface RegisterServiceProps {
  name: string
  accountable_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  complement: string | null
}

export class RegisterService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: RegisterServiceProps) {
    const password_hash = await hash(data.password, 6)

    const org = await this.orgsRepository.create({
      name: data.name,
      accountable_name: data.accountable_name,
      email: data.email,
      whatsapp: data.whatsapp,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      complement: data.complement ?? null,
      password_hash,
    })

    return { org }
  }
}
