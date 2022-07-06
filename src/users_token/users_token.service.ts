import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersTokenDto } from './dto/create-users_token.dto';
import { UsersTokenRepository } from './entities/users_token.repository';

@Injectable()
export class UsersTokenService {
  constructor(
    @InjectRepository(UsersTokenRepository)
    private usersTokenRepository: UsersTokenRepository
  ) { }

  public async createUsersToken(data: CreateUsersTokenDto) {
    return await this.usersTokenRepository.save(data);
  }
}
