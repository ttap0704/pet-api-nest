import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
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

  @Get('/platform/:platform')
  public async getPlatformUser(@Param('platform') platform: 'naver' | 'kakao', @Query('login_id') login_id: string) {
    return await this.usersService.getPlatformUser(platform, login_id)
  }

  @Get('/:nickname')
  public async checkNickname(@Param('nickname') nickname: string) {
    return await this.usersService.checkNickname(nickname)
  }

  @Post('/join')
  public async joinUser(@Body() data: CreateUsersDto) {
    return await this.usersService.joinUser(data);
  }

  @Post('/:user_id/info')
  public async updateUser(@Param('user_id') user_id: number, @Body() data: UpdateUsersDto) {
    return await this.usersService.updateUser(user_id, data);
  }
}
