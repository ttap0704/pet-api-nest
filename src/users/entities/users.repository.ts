import { EntityRepository, Repository } from 'typeorm';
import { CreateUsersDto } from '../dto/create-users.dto';
import { Users } from './users.entity';
import { hash } from '../../../utils/bcrypt'
import { ACCOMMODATION_BUSINESS_CODE_LIST, RESTAURANT_BUSINESS_CODE_LIST } from 'constant';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  public async createUser(createData: CreateUsersDto): Promise<Users> {
    const user = new Users();

    user.login_id = createData.login_id;
    user.nickname = createData.nickname;
    user.password = createData.password ? await hash(createData.password) : null;
    user.type = createData.type;
    user.business_id = createData.business_id;
    user.business = createData.business;
    user.kakao = createData.kakao ?? null;
    user.naver = createData.naver ?? null;
    user.certification = createData.kakao || createData.naver ? 1 : 0
    user.male = createData.male
    user.birth_year = createData.birth_year

    await this.save(user);

    return user;
  }
}