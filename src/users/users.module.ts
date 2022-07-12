import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinCertificationRepository } from 'src/join_certification/entities/join_certification.repository';
import { LikesRepository } from 'src/likes/entities/likes.repository';
import { LikesService } from 'src/likes/likes.service';
import { UsersRepository } from './entities/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, JoinCertificationRepository, LikesRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, LikesService],
  exports: [UsersService]
})
export class UsersModule { }
