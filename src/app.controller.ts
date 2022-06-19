import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LocalSuperAuthGuard } from './auth/local_super-auth.guard';

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
  async loginUser(@Request() req) {
    return await this.authService.loginUser(req.user);
  }

  @UseGuards(LocalSuperAuthGuard)
  @Post('super/login')
  async loginSuper(@Request() req) {
    return await this.authService.loginUser(req.user);
  }
}
