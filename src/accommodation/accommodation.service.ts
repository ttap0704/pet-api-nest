import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { Images } from 'src/images/entities/images.entity';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { FindOneOptions, getRepository, In, Like } from 'typeorm';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { Accommodation } from './entities/accommodation.entity';
import { AccommodationRepository } from './entities/accommodation.repository';

interface AccommodationList extends Accommodation {
  accommodation_images: Images[];
  accommodation_rooms: RoomsList[]
}

interface RoomsList extends Rooms {
  rooms_images?: Images[]
}

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,

    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository,

    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  public async getAccommodationList(types: string, location: string) {
    const require = { type: types ? In(types.split(',')) : In([1, 2, 3, 4]) }

    const accommodation_list: Accommodation[] = await this.accommodationRepository.find({
      order: { id: 'DESC' },
      take: 20,
      where:
        location ? [{
          ...require,
          sido: Like(`%${location}%`),
        },
        {
          ...require,
          sigungu: Like(`%${location}%`),

        },
        {
          ...require,
          bname: Like(`%${location}%`),
        },
        {
          ...require,
          road_address: Like(`%${location}%`)
        }
        ] : [{
          ...require
        }]

    })

    const final_accommodation_list: AccommodationList[] = []

    for (const accommodation of accommodation_list) {
      const accommodation_images = await this.imagesRepository.find({
        where: {
          target_id: accommodation.id,
          category: 2,
        },
        order: { seq: 'ASC' },
        take: 1
      })
      final_accommodation_list.push({ ...accommodation, accommodation_images })
    }

    return final_accommodation_list
  }

  public async getAccommodationDetail(id: number) {
    const accommodation: Accommodation = await this.accommodationRepository.findOne({
      where: { id },
      relations: ['accommodation_peak_season']
    })


    const final_accommodation: AccommodationList = { ...accommodation, accommodation_images: [] }

    const accommodation_images = await this.imagesRepository.find({
      where: { target_id: accommodation.id, category: 2 },
      order: { seq: 'ASC' },
      take: 1
    })

    const accommodation_rooms: RoomsList[] = await this.roomsRepository.find({
      where: { accommodation_id: accommodation.id },
      order: { seq: 'ASC' }
    })

    for (const room of accommodation_rooms) {
      const rooms_images = await this.imagesRepository.find({
        where: { target_id: room.id, category: 21 },
        order: { seq: 'ASC' }
      })
      room.rooms_images = rooms_images;
    }

    final_accommodation.accommodation_rooms = accommodation_rooms;
    final_accommodation.accommodation_images = accommodation_images;


    return final_accommodation
  }

  public async getAdminAccommodation(admin: number, page: string) {
    try {
      const accommodation_count = await this.accommodationRepository.count({ where: { admin } })
      const accommodation_list: Accommodation[] = await this.accommodationRepository.find({
        where: { admin },
        take: 5,
        skip: 5 * (Number(page) - 1),
        relations: ['accommodation_peak_season'],
        order: {
          id: 'DESC',
        },
      })

      const final_accommodation_list: AccommodationList[] = []

      for (const accommodation of accommodation_list) {
        const accommodation_images = await this.imagesRepository.find({
          where: { target_id: accommodation.id, category: 2 },
          order: { seq: 'ASC' }
        })
        const accommodation_rooms = await this.roomsRepository.find({
          where: { accommodation_id: accommodation.id },
          order: { seq: 'ASC' }
        })
        final_accommodation_list.push({ ...accommodation, accommodation_images, accommodation_rooms })
      }

      return { count: accommodation_count, rows: final_accommodation_list };
    } catch (err) {
      throw new Error(err)
    }
  }

  public async updateAccommodation(accommodation_id: number, update_data: UpdateAccommodationDto) {
    return await this.accommodationRepository.update({ id: accommodation_id }, { ...update_data })
  }

  public async deleteAccommodation(accommodation_id: number) {
    return await this.accommodationRepository.softDelete({ id: accommodation_id })
  }
}
