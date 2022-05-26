import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from 'src/business/entities/business.entity';
import { UsersRepository } from 'src/users/entities/users.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Users } from 'src/users/entities/users.entity';
import { ACCOMMODATION_BUSINESS_CODE_LIST, RESTAURANT_BUSINESS_CODE_LIST } from 'constant';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { generateRandom } from 'utils/tools';
import { getCertificationContents, sendEmail } from 'utils/email_tools';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,


    @InjectRepository(BusinessRepository)
    private businessRepository: BusinessRepository,

    @InjectRepository(JoinCertificationRepository)
    private joinCertificationRepository: JoinCertificationRepository
  ) { }

  public async joinAdmin(data: CreateAdminDto) {
    try {
      const { join_data, business_data } = data;

      let user_type = null;


      if (ACCOMMODATION_BUSINESS_CODE_LIST.includes(business_data.b_type)) {
        user_type = 2
      } else if (RESTAURANT_BUSINESS_CODE_LIST.includes(business_data.b_type)) {
        user_type = 1
      } else {
        // return { pass: false, message: 'Not Target' }
        user_type = 0
      }

      const check_nick = await this.usersRepository.findOne({ nickname: join_data.nickname })
      const check_login_id = await this.usersRepository.findOne({ login_id: join_data.login_id })

      console.log(check_nick)
      if (check_nick) {
        return { pass: false, message: 'Duplicate Nickname' }
      } else if (check_login_id) {
        return { pass: false, message: 'Duplicate Email' }
      }

      const business = await this.businessRepository.createBusiness(business_data);

      join_data.business_id = business.id;
      join_data.business = business;
      join_data.type = user_type

      const user = await this.usersRepository.createUser(join_data);

      if (user && business_data) {
        const random_num = generateRandom(111111, 999999);
        const cert_res = await this.joinCertificationRepository.createJoinCertification({ cert_num: `${random_num}`, admin_id: user.id })
        const email_data = {
          to_name: join_data.name,
          to: join_data.login_id,
          subject: '[어디어디] 회원가입 이메일 인증',
          message: getCertificationContents(random_num, `http://localhost:3001/manage/join/certification/${cert_res.id}`)
        }
        await sendEmail(email_data)

        return { pass: true, user, business, cert_res };
      } else {
        return { pass: false, message: 'Error Join' };
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
