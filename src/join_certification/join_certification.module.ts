import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/entities/users.repository';
import { JoinCertificationRepository } from './entities/join_certification.repository';
import { JoinCertificationController } from './join_certification.controller';
import { JoinCertificationService } from './join_certification.service';

@Module({
  imports: [TypeOrmModule.forFeature([JoinCertificationRepository, UsersRepository])],
  controllers: [JoinCertificationController],
  providers: [JoinCertificationService]
})
export class JoinCertificationModule { }
