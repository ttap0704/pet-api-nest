import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from 'src/business/entities/business.entity';
import { UsersRepository } from 'src/users/entities/users.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { CreateManagerDto } from './dto/create-manager.dto';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(BusinessRepository)
    private businessRepository: BusinessRepository
  ) { }

  public async joinManager(data: CreateManagerDto) {
    const { join_data, business_data } = data;

    const business = await this.businessRepository.createBusiness(business_data);
    const user = await this.usersRepository.createUser(join_data);

    return { ...user }
  }
}
