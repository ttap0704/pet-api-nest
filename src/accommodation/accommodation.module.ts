import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from './accommodation.service';
import { AccommodationRepository } from './entities/accommodation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationRepository])],
  providers: [AccommodationService],
  exports: [AccommodationService]
})
export class AccommodationModule { }
