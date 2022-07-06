import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTokenRepository } from './entities/users_token.repository';
import { UsersTokenService } from './users_token.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersTokenRepository])],
  providers: [UsersTokenService],
  exports: [UsersTokenService]
})
export class UsersTokenModule { }
