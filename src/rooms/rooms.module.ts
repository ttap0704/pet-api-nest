import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RoomsRepository } from './entities/rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsRepository, AccommodationRepository, ImagesRepository])],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule { }
