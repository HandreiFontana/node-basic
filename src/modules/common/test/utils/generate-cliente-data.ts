import { faker } from '@faker-js/faker'

export function generateNewClienteData(overide = {}) {
  return {
    nome: faker.datatype.string(100),
    estadoId: null,
    cidadeId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateClienteData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(100),
    estadoId: null,
    cidadeId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateClientesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateClienteData(overide)
    }
  )
}
