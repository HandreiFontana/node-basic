import { getRepository, Repository } from 'typeorm'
import { IClienteDTO } from '@modules/common/dtos/i-cliente-dto'
import { IClienteRepository } from '@modules/common/repositories/i-cliente-repository'
import { Cliente } from '@modules/common/infra/typeorm/entities/cliente'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ClienteRepository implements IClienteRepository {
  private repository: Repository<Cliente>

  constructor() {
    this.repository = getRepository(Cliente)
  }


  // create
  async create ({
    nome,
    estadoId,
    cidadeId
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = this.repository.create({
      nome,
      estadoId,
      cidadeId
    })

    const result = await this.repository.save(cliente)
      .then(clienteResult => {
        return ok(clienteResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "nome",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let clientes = await this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "id"',
          'cli.nome as "nome"',
        ])
        .where('CAST(cli.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('cli.nome', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (clientes.length > rowsPerPage) {
        clientes = clientes.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(clientes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const clientes = await this.repository.createQueryBuilder('cli')
        .select([
          'cli. as "value"',
          'cli. as "label"',
        ])
        .where('cli. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cli.')
        .getRawMany()

      return ok(clientes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const cliente = await this.repository.createQueryBuilder('cli')
        .select([
          'cli. as "value"',
          'cli. as "label"',
        ])
        .where('cli. = :id', { id: `${id}` })
        .getRawOne()

      return ok(cliente)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const clientes = await this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "id"',
        ])
        .where('cli.nome ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: clientes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const cliente = await this.repository.createQueryBuilder('cli')
        .select([
          'cli.id as "id"',
          'cli.nome as "nome"',
          'cli.estadoId as "estadoId"',
          'cli.cidadeId as "cidadeId"',
        ])
        .where('cli.id = :id', { id })
        .getRawOne()

      if (typeof cliente === 'undefined') {
        return noContent()
      }

      return ok(cliente)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    estadoId,
    cidadeId
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = await this.repository.findOne(id)

    if (!cliente) {
      return notFound()
    }

    const newcliente = this.repository.create({
      id,
      nome,
      estadoId,
      cidadeId
    })

    try {
      await this.repository.save(newcliente)

      return ok(newcliente)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { ClienteRepository }
