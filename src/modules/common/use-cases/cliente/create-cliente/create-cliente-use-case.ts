import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/common/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/common/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  estadoId: string
  cidadeId: string
}

@injectable()
class CreateClienteUseCase {
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    nome,
    estadoId,
    cidadeId
  }: IRequest): Promise<Cliente> {
    const result = await this.clienteRepository.create({
        nome,
        estadoId,
        cidadeId
      })
      .then(clienteResult => {
        return clienteResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateClienteUseCase }
