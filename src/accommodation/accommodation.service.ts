import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { Accommodation } from './entities/accommodation.entity';
import { AccommodationRepository } from './entities/accommodation.repository';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,

  ) { }

}
