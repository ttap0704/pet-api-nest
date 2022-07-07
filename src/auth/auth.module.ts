import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersTokenService } from 'src/users_token/users_token.service';
import { UsersTokenRepository } from 'src/users_token/entities/users_token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/entities/users.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      UsersTokenRepository
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersTokenService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
