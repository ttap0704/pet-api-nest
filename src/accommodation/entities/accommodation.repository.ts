import { EntityRepository, Repository } from 'typeorm';
import { CreateAccommodationDto } from '../dto/create-accommodation.dto';
import { Accommodation } from './accommodation.entity';

@EntityRepository(Accommodation)
export class AccommodationRepository extends Repository<Accommodation> {

  public async createAccommodation(data: CreateAccommodationDto) {
    return await this.save(data);
  }
}