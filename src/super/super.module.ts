import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { RestaurantRepository } from 'src/restaurant/entities/restaurant.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { SuperController } from './super.controller';
import { SuperService } from './super.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantRepository, AccommodationRepository, UsersRepository, BusinessRepository])],
  controllers: [SuperController],
  providers: [SuperService]
})
export class SuperModule { }
