import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, BusinessRepository])],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule { }
