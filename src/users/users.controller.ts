import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginUsersDto } from './dto/login-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('')
  public async getUsers() {
    return 'get users'
  }

  @Post('/login')
  public async loginUser(@Body() loginData: LoginUsersDto) {
    return await this.usersService.loginUser(loginData)
  }
}
