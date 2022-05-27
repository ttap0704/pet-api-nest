import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/entities/users.repository';
import { isHashValid } from 'utils/bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(data: LoginUsersDto): Promise<{ pass: boolean, message?: string, user?: Users }> {
    const { login_id, password } = data;

    if (login_id.length == 0 || password?.length == 0 || password == null) {
      return { pass: false, message: 'Empty Data' }
    }

    const user = await this.usersService.findUser(data);
    if (user) {
      if (user.certification == 0) {
        return { pass: false, message: 'Before Certification' }
      }

      const validation = await isHashValid(password, user.password)
      if (validation) {
        return { pass: true, user }
      } else {
        return { pass: false, message: 'Wrong Password' }
      }
    } else {
      return { pass: false, message: 'Wrong Email' }
    }
  }

  public async loginUser(user: LoginUsersDto) {
    console.log(user)
    const payload = { ...user, access_token: this.jwtService.sign({ ...user }), }
    return {
      payload
    }
  }
}