import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from 'generated/prisma'
import { compare } from 'bcrypt'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'

interface AuthServiceProps {
  email: string
  password: string
}

export interface AuthServiceResponse {
  org: Organization
}

export class AuthService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthServiceProps): Promise<AuthServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatch = await compare(password, org.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
