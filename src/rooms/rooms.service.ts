import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccommodationRepository } from 'src/accommodation/entities/accommodation.repository';
import { Images } from 'src/images/entities/images.entity';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { In } from 'typeorm';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { Rooms } from './entities/rooms.entity';
import { RoomsRepository } from './entities/rooms.repository';

interface RoomsList extends Rooms {
  rooms_images: Images[],
  accommodation_label: string
}

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository,

    @InjectRepository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  public async createRooms(accommodation_id: number, data: CreateRoomsDto[]): Promise<Rooms[]> {
    const rooms: Rooms[] = []

    for (const room_data of data) {
      room_data.accommodation = await this.accommodationRepository.findOne({ where: { id: accommodation_id } })
      const room = await this.roomsRepository.save(room_data);
      rooms.push(room)
    }

    return rooms;
  }

  public async addAdminRooms(accommodation_id: number, data: CreateRoomsDto[]): Promise<Rooms[]> {
    const rooms: Rooms[] = []
    const last_seq_room = await this.roomsRepository.find({
      where: { accommodation_id },
      order: {
        seq: 'DESC',
      },
      take: 1
    })

    let last_seq = last_seq_room[0].seq;
    for (const room_data of data) {
      room_data.accommodation = await this.accommodationRepository.findOne({ where: { id: accommodation_id } })
      room_data.seq = last_seq + 1
      const room = await this.roomsRepository.save(room_data);

      last_seq++;
      rooms.push(room)
    }

    return rooms;
  }

  public async getAdminRooms(admin: number, page: string) {
    try {

      const accommodation_ids = await this.accommodationRepository.find({
        where: { admin },
        select: ['id']
      })
      const target_ids = accommodation_ids.map(item => item.id)

      const rooms_count = await this.roomsRepository.count({ where: { accommodation_id: In(target_ids) } })
      const rooms_list: Rooms[] = await this.roomsRepository.find({
        where: {
          accommodation_id: In(target_ids)
        },
        take: 5,
        skip: 5 * (Number(page) - 1),
        order: { id: 'DESC' },
        relations: ['accommodation']
      })

      console.log(rooms_list)

      const final_rooms_list: RoomsList[] = []

      for (const room of rooms_list) {
        const rooms_images = await this.imagesRepository.find({
          where: { target_id: room.id, category: 21 },
          order: { seq: 'ASC' }
        })
        final_rooms_list.push({ ...room, rooms_images, accommodation_label: room.accommodation.label })
      }

      return { count: rooms_count, rows: final_rooms_list };
    } catch (err) {
      throw new Error(err)
    }
  }
}
