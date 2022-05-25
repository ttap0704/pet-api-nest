import { EntityRepository, Repository } from 'typeorm';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { Business } from './business.entity';

@EntityRepository(Business)
export class BusinessRepository extends Repository<Business> {
  public async createBusiness(createData: CreateBusinessDto): Promise<Business> {
    const business = new Business();

    for (const [key, val] of Object.entries(createData)) {
      business[key] = val;
    }
    await this.save(business);

    return business;
  }
}