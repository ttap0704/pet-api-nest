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
    user.name = createData.name;
    user.nickname = createData.nickname;
    user.password = await hash(createData.password);
    user.type = createData.type;


    await this.save(user);

    return user;
  }
}