import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { AccommodationService } from './accommodation.service';
import { AccommodationRepository } from './entities/accommodation.repository';
import { AccommodationController } from './accommodation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationRepository, RoomsRepository, ImagesRepository])],
  providers: [AccommodationService],
  exports: [AccommodationService],
  controllers: [AccommodationController]
})
export class AccommodationModule { }
