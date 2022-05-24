import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('')
  getUsers() {
    return 'get users'
  }

  @Post('/join')
  joinUser() {
    return 'join user'
  }
}
