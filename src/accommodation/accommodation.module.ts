import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { AccommodationService } from './accommodation.service';
import { AccommodationRepository } from './entities/accommodation.repository';
import { AccommodationController } from './accommodation.controller';
import { AccommodationViewsCountRepository } from 'src/accommodation_views_count/entities/accommodation_views_count.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationRepository, RoomsRepository, ImagesRepository, AccommodationViewsCountRepository])],
  providers: [AccommodationService],
  exports: [AccommodationService],
  controllers: [AccommodationController]
})
export class AccommodationModule { }
