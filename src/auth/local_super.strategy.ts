import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSuperStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login_id', passField: 'password' });
  }

  async validate(login_id: string, password: string): Promise<any> {
    const user = await this.authService.validateSuper({ login_id, password });
    return user;
  }
}