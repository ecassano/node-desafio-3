import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcrypt'
import { OrgAlreadyExistsError } from '../errors/org-already-exists.error'
import { Organization } from 'generated/prisma'

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

export interface RegisterServiceResponse {
  org: Organization
}

export class RegisterService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: RegisterServiceProps): Promise<RegisterServiceResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

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
