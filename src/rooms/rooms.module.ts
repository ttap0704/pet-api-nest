import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsRepository } from './entities/rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsRepository])],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule { }
