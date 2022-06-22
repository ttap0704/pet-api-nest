import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { DailyController } from './daily.controller';
import { DailyService } from './daily.service';
import { DailyRepository } from './entities/daily.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DailyRepository, UsersRepository, ImagesRepository])],
  controllers: [DailyController],
  providers: [DailyService]
})
export class DailyModule { }
