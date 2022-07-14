import { Body, Controller, Get, Ip, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async checkAuth(user: any) {
    console.log(user);
    return { check: true }
  }

  @Post('/token')
  public async createNewToken(@Ip() ip: string, @Body() data: { token: string }) {
    return await this.authService.createNewToken(ip, data.token);
  }
}
