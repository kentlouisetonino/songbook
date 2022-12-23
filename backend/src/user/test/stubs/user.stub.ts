import { User } from 'src/entities/User'
import { DeleteUserOutput } from 'src/user/dto/user.output'

export const userStub = (): User => {
  return {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'unit_test@test.com',
    password:
      'eyJhbGciOiJIUzI1NiJ9.UGFzc3dvcmQxMjMh.O8yBuKKKBXAvZzRdkmiNPNrxYbeHhQj-hDFYJ8vNG3I',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY2MzQzODc1NSwiZXhwIjoxNjYzNDYzOTU1fQ.ECIh8abvEra8gmpgWmm5DsV2XMvpPk67bnR28ozvh1U',
    createdAt: new Date('2022-09-17 13:38:05.384632000'),
    updatedAt: new Date('2022-09-17 18:19:15'),
  }
}

export const deleteUserStub = (): DeleteUserOutput => {
  return {
    status: 200,
    message: 'User successfully deleted.',
  }
}
