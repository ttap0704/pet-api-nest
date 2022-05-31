import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationPeakSeasonService } from './accommodation_peak_season.service';
import { AccommodationPeakSeasonRepository } from './entities/accommodation_peak_season.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationPeakSeasonRepository])],
  providers: [AccommodationPeakSeasonService],
  exports: [AccommodationPeakSeasonService]
})
export class AccommodationPeakSeasonModule { }
