import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/common/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/common/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  estadoId: string
  cidadeId: string
}

@injectable()
class UpdateClienteUseCase {
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    id,
    nome,
    estadoId,
    cidadeId
  }: IRequest): Promise<HttpResponse> {
    const cliente = await this.clienteRepository.update({
      id,
      nome,
      estadoId,
      cidadeId
    })

    return cliente
  }
}

export { UpdateClienteUseCase }
