import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from 'src/business/entities/business.repository';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { UsersRepository } from 'src/users/entities/users.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, BusinessRepository, JoinCertificationRepository])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
