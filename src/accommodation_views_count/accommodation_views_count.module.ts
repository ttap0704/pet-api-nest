import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationViewsCountRepository } from './entities/accommodation_views_count.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationViewsCountRepository])],
})
export class AccommodationViewsCountModule { }
