import { Body, Controller, Get, Ip, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Users } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async checkAuth(@Req() req: Request, @Query('type') type: string) {
    const { user } = req;

    let statusCode = 200;
    if (![1, 2].includes(user['type']) && type == 'admin') {
      statusCode = 403;
    } else if (![0].includes(user['type']) && type == 'super') {
      statusCode = 403;
    }

    return { statusCode }
  }

  @Post('/token')
  public async createNewToken(@Ip() ip: string, @Body() data: { token: string }) {
    return await this.authService.createNewToken(ip, data.token);
  }
}
