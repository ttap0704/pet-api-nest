import { Controller, Get, Ip, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async loginUser(@Request() req, @Ip() ip: string) {
    return await this.authService.loginUser(req.user, false, ip);
  }

  @UseGuards(LocalAuthGuard)
  @Post('super/login')
  async loginSuper(@Request() req, @Ip() ip: string) {
    return await this.authService.loginUser(req.user, true, ip);
  }
}
