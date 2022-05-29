import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';

@Module({
  providers: [AccommodationService]
})
export class AccommodationModule {}
