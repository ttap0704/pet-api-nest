import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUsersDto } from './dto/login-users.dto';
import { UsersRepository } from './entities/users.repository';
import { isHashValid } from '../../utils/bcrypt'
import { CreateUsersDto } from './dto/create-users.dto';
import { generateRandom } from 'utils/tools';
import { getCertificationContents, sendEmail } from 'utils/email_tools';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(JoinCertificationRepository)
    private joinCertificationRepository: JoinCertificationRepository
  ) { }

  public async findUser(data: LoginUsersDto) {
    const { login_id } = data;
    return await this.usersRepository.findOne({ login_id })
  }

  public async joinUser(data: CreateUsersDto) {
    try {

      const check_nick = await this.usersRepository.findOne({ nickname: data.nickname })
      const check_login_id = await this.usersRepository.findOne({ login_id: data.login_id })

      if (check_nick) {
        return { pass: false, message: 'Duplicate Nickname' }
      } else if (check_login_id) {
        return { pass: false, message: 'Duplicate Email' }
      }

      data.type = 20

      const user = await this.usersRepository.createUser(data);

      if (user) {
        const random_num = generateRandom(111111, 999999);
        const cert_res = await this.joinCertificationRepository.createJoinCertification({ cert_num: `${random_num}`, admin_id: user.id })
        const email_data = {
          to_name: data.name,
          to: data.login_id,
          subject: '[어디어디] 회원가입 이메일 인증',
          message: getCertificationContents(random_num, `http://localhost:3001/join/certification/${cert_res.id}`)
        }
        await sendEmail(email_data)

        return { pass: true, user, cert_res };
      } else {
        return { pass: false, message: 'Error Join' };
      }
    } catch (err) {
      throw new Error(err)
    }
  }

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

  public async updateUser(id: number, update_data: UpdateUsersDto) {
    const keys = [...Object.keys(update_data)];
    if (keys.includes('warning')) {
      const user = await this.usersRepository.findOne({ where: { id } })
      const warning_num = user.warning + 1;

      update_data.warning = warning_num;
    }
    return await this.usersRepository.update({ id }, { ...update_data })
  }
}
