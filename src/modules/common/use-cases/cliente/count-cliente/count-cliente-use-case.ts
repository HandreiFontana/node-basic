import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/common/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/common/repositories/i-cliente-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountClienteUseCase {
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const clientesCount = await this.clienteRepository.count(
      search
    )

    return clientesCount
  }
}

export { CountClienteUseCase }
