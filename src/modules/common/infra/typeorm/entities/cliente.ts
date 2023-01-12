import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Estado } from '@modules/common/infra/typeorm/entities/estado'
import { Cidade } from '@modules/common/infra/typeorm/entities/cidade'

@Entity('clientes')
class Cliente {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @ManyToOne(() => Estado, { nullable: true, eager: true })
  @JoinColumn({ name: 'estado_id', referencedColumnName: 'id' })
  estadoId?: string

  @ManyToOne(() => Cidade, { nullable: true, eager: true })
  @JoinColumn({ name: 'cidade_id', referencedColumnName: 'id' })
  cidadeId?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Cliente }
