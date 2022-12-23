import { Controller, Get, Post, Req, Delete, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { UserService } from './user.service'
import { User } from 'src/entities/User'
import { DeleteUserOutput } from './dto/user.output'
import { AuthGuard } from '../auth/guards/auth.guard'
import { Public } from '../auth/decorators/public.decorator'

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers()
  }

  @Get()
  getUserById(@Req() req: Request): Promise<User> {
    return this.userService.getUserById(Number(req.query.id))
  }

  @Get(':email')
  getUserByEmail(@Req() req: Request): Promise<User> {
    return this.userService.getUserByEmail(req.params.email)
  }

  @Post('create')
  @Public()
  createUser(@Req() req: Request): Promise<User> {
    return this.userService.createUser(req.body)
  }

  @Post('update')
  updateUser(@Req() req: Request): Promise<User> {
    return this.userService.updateUser(req.body)
  }

  @Delete('delete/:id')
  deleteUser(@Req() req: Request): Promise<DeleteUserOutput> {
    return this.userService.deleteUser(Number(req.params.id))
  }
}
