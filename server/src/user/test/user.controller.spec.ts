import { Test } from '@nestjs/testing';
import { Request } from 'express';
import { User } from 'src/entities/User';

import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userStub, deleteUserStub } from './stubs/user.stub';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUserInput, UpdateUserInput } from '../dto/user.input';
import { DeleteUserOutput } from '../dto/user.output';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => true)
        }
      ]
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('A. getUsers', () => {
    let users: User[];

    beforeEach(async () => {
      users = await userController.getUsers();
    });

    test('#1: If getUsers is called.', () => {
      expect(userService.getUsers).toHaveBeenCalled();
    });

    test('#2: If getUsers returns an array.', () => {
      expect(userService.getUsers()).toBe(users);
    });
  });

  describe('B. getUserById', () => {
    let user: User;

    const request: Request | any = {
      query: {
        id: userStub().id
      }
    };

    beforeEach(async () => {
      user = await userController.getUserById(request);
    });

    test('#1: If getUserById is called.', () => {
      expect(userService.getUserById).toBeCalledWith(request.query.id);
    });

    test('#2: If getUserById returns a user object.', () => {
      expect(userService.getUserById(userStub().id)).toBe(user);
    });
  });

  describe('C. getUserByEmail', () => {
    let user: User;

    const request: Request | any = {
      params: {
        email: userStub().email
      }
    };

    beforeEach(async () => {
      user = await userController.getUserByEmail(request);
    });

    test('#1: If getUserByEmail is called.', () => {
      expect(userService.getUserByEmail).toBeCalledWith(request.params.email);
    });

    test('#2: If getUserByEmail returns a user object.', () => {
      expect(userService.getUserByEmail(userStub().email)).toBe(user);
    });
  });

  describe('D. creatUser', () => {
    let user: User;
    let createUserInput: CreateUserInput;

    beforeEach(async () => {
      createUserInput = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        email: userStub().email,
        password: userStub().password
      };

      const request: Request | any = {
        body: createUserInput
      };

      user = await userController.createUser(request);
    });

    test('#1: If createUser is called.', () => {
      expect(userService.createUser).toHaveBeenCalledWith(createUserInput);
    });

    test('#2: If createUser return a user object.', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('E. updateUser', () => {
    let user: User;
    let updateUserInput: UpdateUserInput;

    beforeEach(async () => {
      updateUserInput = {
        id: userStub().id,
        firstName: userStub().firstName,
        lastName: userStub().lastName
      };

      const request: Request | any = {
        body: updateUserInput
      };

      user = await userController.updateUser(request);
    });

    test('#1: If updateUser is called.', () => {
      expect(userService.updateUser).toHaveBeenCalledWith(updateUserInput);
    });

    test('#2: If updateUser returns an user object.', () => {
      expect(user).toStrictEqual(userStub());
    });
  });

  describe('F. deleteUser', () => {
    let deleteUserOutput: DeleteUserOutput;

    const request: Request | any = {
      params: {
        id: userStub().id
      }
    };

    beforeEach(async () => {
      deleteUserOutput = await userController.deleteUser(request);
    });

    test('#1: If deleteUser is called', () => {
      expect(userService.deleteUser).toHaveBeenCalledWith(userStub().id);
    });

    test('#2: If deleteUser returns an output.', () => {
      expect(deleteUserOutput).toStrictEqual(deleteUserStub());
    });
  });
});
