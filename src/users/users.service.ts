import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUsersDto } from './dto/login-users.dto';
import { UsersRepository } from './entities/users.repository';
import { isHashValid } from '../../utils/bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) { }

  public async loginUser(data: LoginUsersDto) {
    const { login_id, password } = data;

    if (login_id.length == 0 || password?.length == 0 || password == null) {
      return { pass: false, message: 'Empty Data' }
    }

    const user = await this.usersRepository.findOne({ login_id });
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
}
