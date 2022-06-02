import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { AccommodationService } from './accommodation.service';
import { AccommodationRepository } from './entities/accommodation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationRepository, RoomsRepository, ImagesRepository])],
  providers: [AccommodationService],
  exports: [AccommodationService]
})
export class AccommodationModule { }
