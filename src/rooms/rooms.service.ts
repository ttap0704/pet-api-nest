import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { Rooms } from './entities/rooms.entity';
import { RoomsRepository } from './entities/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository
  ) { }

  public async createRooms(data: CreateRoomsDto[]): Promise<Rooms[]> {
    const rooms: Rooms[] = []

    for (const room_data of data) {
      const room = await this.roomsRepository.save(room_data);
      rooms.push(room)
    }

    return rooms;
  }
}
