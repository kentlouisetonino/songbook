import { userStub, deleteUserStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  getUsers: jest.fn().mockReturnValue([userStub()]),
  getUserById: jest.fn().mockReturnValue(userStub()),
  getUserByEmail: jest.fn().mockReturnValue(userStub()),
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  deleteUser: jest.fn().mockResolvedValue(deleteUserStub())
});
