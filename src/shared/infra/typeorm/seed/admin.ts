import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()


  // block reasons

  await connection.query(
    `INSERT INTO block_reasons (
      id,
      code,
      description,
      instructions_to_solve,
      is_solved_by_password_reset,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '001', 'Conta bloqueada por excesso de tentativas de acesso.', 'Use a opção de reset de senha.', true, 'now()', 'now()')`
  )


  // user groups

  await connection.query(
    `INSERT INTO user_groups (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'basic', 'now()', 'now()')`
  )


  // users

  const id = uuidV4()
  const password = await hash(btoa('admin'), 8)

  await connection.query(
    `INSERT INTO users (
      id, 
      user_group_id,
      name, 
      login, 
      password, 
      is_admin, 
      is_super_user, 
      created_at,
      updated_at
    ) values (
      '${id}', 
      'ca49908a-28cd-4573-808c-36c5f42a2e68',
      'admin', 
      'admin@basic.com.br', 
      '${password}', 
      true, 
      true, 
      'now()', 
      'now()'
    )`
  )
  

  // modules

  await connection.query(
    `INSERT INTO modules (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'Segurança', 'now()', 'now()'),
			('a3929245-d5ac-4e9c-938a-6163f36ddfbf', 'Tabelas', 'now()', 'now()')`
  )


  // menu options

  await connection.query(
    `INSERT INTO menu_options (
      id,
      module_id,
      sequence,
      label,
      route,
      icon,
      key,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'fa-solid fa-lock', 'security', 'now()', 'now()'), 
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Motivos de Bloqueio', '/block-reasons', 'List', 'security-block-reasons', 'now()', 'now()'), 
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Grupos de Usuários', '/user-groups', 'List', 'security-user-groups', 'now()', 'now()'), 
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Usuários', '/users', 'List', 'security-users', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Módulos', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Perfis', '/profiles', 'List', 'security-profiles', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001007', 'Usuários x Perfis', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001008', 'Navegação', '/navigations', 'List', 'security-navigations', 'now()', 'now()'),
			('64ca188d-fc5b-4adc-a67b-b5c57750b851', 'a3929245-d5ac-4e9c-938a-6163f36ddfbf', '002', 'Tabelas', '', 'fa-solid fa-table', 'common', 'now()', 'now()'),
			('35bf8fe5-4095-464e-b1ba-c88acbe5577c', 'a3929245-d5ac-4e9c-938a-6163f36ddfbf', '002001', 'Estados', '/estados', 'List', 'common-estados', 'now()', 'now()'),
			('6ae78a38-9b74-4a00-b5c8-57b8b228bc71', 'a3929245-d5ac-4e9c-938a-6163f36ddfbf', '002002', 'Cidades', '/cidades', 'List', 'common-cidades', 'now()', 'now()'),
			('bebd4d4f-a9c6-4641-9e53-a44ad2d60a0b', 'a3929245-d5ac-4e9c-938a-6163f36ddfbf', '002003', 'Clientes', '/clientes', 'List', 'common-clientes', 'now()', 'now()')`
  )


  // profiles

  await connection.query(
    `INSERT INTO profiles (
      id,
      user_group_id,
      name,
      created_at,
      updated_at
    ) values 
      ('3c99decf-f975-4b16-b552-0747afd397a3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Admin', 'now()', 'now()')`
  )


  // profile options

  await connection.query(
    `INSERT INTO profile_options (
      id,
      profile_id,
      menu_option_key,
      permit_all,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '3c99decf-f975-4b16-b552-0747afd397a3', 'security', true, 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-block-reasons', true, 'now()', 'now()'),
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-user-groups', true, 'now()', 'now()'),
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users', true, 'now()', 'now()'),
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-modules', true, 'now()', 'now()'),
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-menu-options', true, 'now()', 'now()'),
      ('2814da68-5179-4152-bd7e-22361b844b88', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-profiles', true, 'now()', 'now()'),
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users-profiles', true, 'now()', 'now()'),
      ('0471bddc-de4c-42d1-a778-b67086796de1', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-navigations', true, 'now()', 'now()'),
			('0906eebd-e0d8-4c83-a680-794824873afa', '3c99decf-f975-4b16-b552-0747afd397a3', 'common', true, 'now()', 'now()'),
			('3cc1add4-2068-412e-aac0-f4da0014de7a', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-estados', true, 'now()', 'now()'),
			('28e7f64b-fc64-4863-a9d4-b5e2433551a6', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-cidades', true, 'now()', 'now()'),
			('8a02c79b-a4f9-4cf4-9aa6-c45b3e58ef94', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-clientes', true, 'now()', 'now()')`
  )


  // user x profile

  await connection.query(
    `INSERT INTO users_profiles (
      id,
      user_id,
      profile_id,
      created_at,
      updated_at
    ) values 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '${id}', '3c99decf-f975-4b16-b552-0747afd397a3', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Admin and Security tables created!'))
