import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinCertificationRepository } from './entities/join_certification.repository';
import { isHashValid } from '../../utils/bcrypt'
import { UsersRepository } from 'src/users/entities/users.repository';
import { CompareJoinCertificationDto } from './dto/compare-join_certification.dto';

@Injectable()
export class JoinCertificationService {
  constructor(
    @InjectRepository(JoinCertificationRepository)
    private joinCertificationRepository: JoinCertificationRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) { }

  public async compareCertNum(compareData: CompareJoinCertificationDto) {
    const { id, cert_num } = compareData
    const hash = await this.joinCertificationRepository.findOne({ id: id });
    if (!hash) {
      return { pass: false, message: 'Wrong Path' }
    } else {
      const compare = await isHashValid(cert_num, hash.cert_num)
      if (compare) {
        await this.usersRepository.update({ certification: 1 }, { id: hash.admin_id })
        await this.joinCertificationRepository.delete({ id })

        return { pass: true }
      } else {
        return { pass: false, message: 'Wrong Number' }
      }
    }
  }
}
