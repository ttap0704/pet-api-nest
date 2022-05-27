import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoginUsersDto } from './dto/login-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    // private authService: AuthService
  ) { }

  @Get('')
  public async getUsers() {
    return 'get users'
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // public async loginUser(@Body() data: LoginUsersDto) {
  //   return this.authService.loginUser(data)
  // }
}
