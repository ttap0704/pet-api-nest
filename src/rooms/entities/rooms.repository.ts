import { EntityRepository, Repository } from 'typeorm';
import { CreateRoomsDto } from '../dto/create-rooms.dto';
import { Rooms } from './rooms.entity';

@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms> {
  public async createRooms(data: CreateRoomsDto[]): Promise<Rooms[]> {
    const rooms: Rooms[] = []

    for (const room_data of data) {
      const room = await this.save(room_data);
      rooms.push(room)
    }

    return rooms;
  }
}