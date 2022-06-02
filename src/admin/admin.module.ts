import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { AccommodationPeakSeasonRepository } from 'src/accommodation_peak_season/entities/accommodation_peak_season.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UsersRepository,
    BusinessRepository,
    JoinCertificationRepository,
    AccommodationRepository,
    AccommodationPeakSeasonRepository,
    RoomsRepository,
    ImagesRepository
  ])],
  controllers: [AdminController],
  providers: [AdminService, AccommodationService]
})
export class AdminModule { }
