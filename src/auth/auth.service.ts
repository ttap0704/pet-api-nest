import { Injectable, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/entities/users.repository';
import { CreateUsersTokenDto } from 'src/users_token/dto/create-users_token.dto';
import { UsersTokenRepository } from 'src/users_token/entities/users_token.repository';
import { isHashValid } from 'utils/bcrypt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(UsersTokenRepository)
    private usersTokenRepository: UsersTokenRepository
  ) { }

  async validateUser(data: LoginUsersDto): Promise<{ pass: boolean, message?: string, user?: Users }> {
    const { login_id, password } = data;

    const user = await this.usersService.findUser(data);
    if (login_id.length == 0 || (user && user.kakao == 0 && user.naver == 0 && password?.length == 0 || password == null)) {
      return { pass: false, message: 'Empty Data' }
    }

    if (user) {
      if (user.certification == 0) {
        return { pass: false, message: 'Before Certification' }
      }


      if (user.kakao == 1 || user.naver == 1) {
        return { pass: true, user }
      } else {
        const validation = await isHashValid(password, user.password)
        if (validation) {
          return { pass: true, user }
        } else {
          return { pass: false, message: 'Wrong Password' }
        }
      }
    } else {
      return { pass: false, message: 'Wrong Email' }
    }
  }

  public async createNewToken(ip: string, expired_token: string) {
    const token_data = await this.usersTokenRepository.findOne({ where: { ip: '::1', access_token: expired_token.trim() } });
    if (token_data) {
      try {
        const check_expired = await this.jwtService.verifyAsync(token_data.refresh_token, { secret: jwtConstants.refresh_secret })
        if (check_expired) {
          const user = await this.usersRepository.findOne({ where: { id: token_data.user_id } })
          const new_token_data = {
            id: user.id,
            login_id: user.login_id,
            nickname: user.nickname,
            type: user.type
          }
          const new_token = await this.jwtService.sign(new_token_data);

          await this.usersTokenRepository.update({ ip: '::1', user_id: user.id }, { access_token: new_token })
          return {
            pass: true,
            new_token
          }
        }
      } catch (err) {
        if (err == 'TokenExpiredError: jwt expired') {
          await this.usersTokenRepository.delete({ user_id: token_data.user_id, ip: '::1' })
          return { pass: false, message: 'Expired Refresh Token' }
        }
      }
    } else {
      return {
        pass: false,
        message: 'No Data'
      }
    }
  }

  public async loginUser(user: { pass: boolean, user: Users }, is_super: boolean, is_admin: boolean, ip: string) {
    const cur_user = user.user;
    if (user.pass) {
      if (is_super && cur_user.type != 0) {
        return {
          pass: false,
          message: 'Not Super'
        }
      } else if (is_admin && ![1, 2].includes(cur_user.type)) {
        return {
          pass: false,
          message: 'Not Admin'
        }
      } else {
        const token_data = {
          id: cur_user.id,
          login_id: cur_user.login_id,
          nickname: cur_user.nickname,
          type: cur_user.type
        }
        const access_token = this.jwtService.sign(token_data)
        const refresh_token = await this.jwtService.signAsync(token_data, {
          expiresIn: '1d',
          secret: jwtConstants.refresh_secret
        })

        const insert_token_data = {
          user_id: cur_user.id,
          access_token,
          refresh_token,
          ip
        }
        const check_token = await this.usersTokenRepository.findOne({ where: { ip, user_id: cur_user.id } });
        if (check_token) {
          await this.usersTokenRepository.update({ ip: '::1', user_id: check_token.user_id }, insert_token_data);
        } else {
          await this.usersTokenRepository.save(insert_token_data);
        }

        return {
          ...user,
          token: access_token
        }
      }

    } else {
      return user;
    }
  }
}