import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { Rooms } from './entities/rooms.entity';
import { RoomsRepository } from './entities/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository,

    @InjectRepository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository
  ) { }

  public async createRooms(data: CreateRoomsDto[]): Promise<Rooms[]> {
    const rooms: Rooms[] = []

    for (const room_data of data) {
      const room = await this.roomsRepository.save(room_data);
      rooms.push(room)
    }

    return rooms;
  }

  public async getAdminRooms(admin: number, page: string) {
    try {

      const accommodation_ids = await this.accommodationRepository.find({ where: { admin }, select: ['id'] });

      // const accommodation_count = await this.roomsRepository.count({ where: { accommodationId } })
      // const accommodation_list: Accommodation[] = await this.accommodationRepository.find({
      //   where: { admin },
      //   take: 5,
      //   skip: 5 * (Number(page) - 1),
      //   order: { id: 'DESC' },
      //   relations: ['accommodation_rooms', 'accommodation_peak_season']
      // })

      // const final_accommodation_list: AccommodationList[] = []

      // for (const accommodation of accommodation_list) {
      //   const accommodation_images = await this.imagesRepository.find({
      //     where: { target_id: accommodation.id, category: 2 },
      //     order: { seq: 'ASC' }
      //   })
      //   final_accommodation_list.push({ ...accommodation, accommodation_images })
      // }

      // return { count: accommodation_count, rows: final_accommodation_list };
      return 'test';
    } catch (err) {
      throw new Error(err)
    }
  }
}
