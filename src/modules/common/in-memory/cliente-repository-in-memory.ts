import { IClienteDTO } from '@modules/common/dtos/i-cliente-dto'
import { IClienteRepository } from '@modules/common/repositories/i-cliente-repository'
import { Cliente } from '@modules/common/infra/typeorm/entities/cliente'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ClienteRepositoryInMemory implements IClienteRepository {
  clientes: Cliente[] = []

  // create
  async create ({
    nome,
    estadoId,
    cidadeId
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = new Cliente()

    Object.assign(cliente, {
      nome,
      estadoId,
      cidadeId
    })

    this.clientes.push(cliente)

    return ok(cliente)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.nome.includes(search)) return true

      return false
    })

    return ok(filteredClientes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.nome.includes(filter)) return true

      return false
    })

    return ok(filteredClientes)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.nome.includes(search)) return true

      return false
    })

    return ok(filteredClientes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const cliente = this.clientes.find((cliente) => cliente.id === id)

    if (typeof cliente === 'undefined') {
      return notFound()
    } else {
      return ok(cliente)
    }
  }


  // update
  async update ({
    id,
    nome,
    estadoId,
    cidadeId
  }: IClienteDTO): Promise<HttpResponse> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id)

    this.clientes[index].nome = nome
    this.clientes[index].estadoId = estadoId
    this.clientes[index].cidadeId = cidadeId

    return ok(this.clientes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id)

    this.clientes.splice(index, 1)

    return ok(this.clientes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ClienteRepositoryInMemory }
