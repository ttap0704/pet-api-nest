import { EntityRepository, Repository } from 'typeorm';
import { CreateJoinCertificationDto } from '../dto/create-join_certification.dto';
import { JoinCertification } from './join_certification.entity';
import { hash } from '../../../utils/bcrypt'

@EntityRepository(JoinCertification)
export class JoinCertificationRepository extends Repository<JoinCertification> {
  public async createJoinCertification(createData: CreateJoinCertificationDto): Promise<JoinCertification> {
    console.log(createData, 'JoinCertification')
    const certification = new JoinCertification();

    for (const [key, val] of Object.entries(createData)) {
      if (key == 'cert_num') {
        certification[key] = await hash(val);
      } else {
        certification[key] = val;
      }
    }
    await this.save(certification);

    return certification;
  }
}