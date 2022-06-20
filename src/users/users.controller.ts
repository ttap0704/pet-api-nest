import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) { }

  @Get('')
  public async getUsers() {
    return 'get users'
  }

  @Post('/join')
  public async joinUser(@Body() data: CreateUsersDto) {
    return await this.usersService.joinUser(data);
  }
}
