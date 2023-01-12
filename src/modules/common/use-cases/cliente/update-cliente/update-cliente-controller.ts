import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateClienteUseCase } from './update-cliente-use-case'

class UpdateClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      estadoId,
      cidadeId
    } = request.body

    const { id } = request.params

    const updateClienteUseCase = container.resolve(UpdateClienteUseCase)

    const result = await updateClienteUseCase.execute({
        id,
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

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateClienteController }
