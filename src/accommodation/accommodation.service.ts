import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { Images } from 'src/images/entities/images.entity';
import { ImagesRepository } from 'src/images/entities/images.repository';
import { RoomsRepository } from 'src/rooms/entities/rooms.repository';
import { Accommodation } from './entities/accommodation.entity';
import { AccommodationRepository } from './entities/accommodation.repository';

interface AccommodationList extends Accommodation {
  accommodation_images: Images[]
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

  public async getAdminAccommodation(admin: number, page: string) {
    try {
      const accommodation_count = await this.accommodationRepository.count({ where: { admin } })
      const accommodation_list: Accommodation[] = await this.accommodationRepository.find({
        where: { admin },
        take: 5,
        skip: 5 * (Number(page) - 1),
        order: { id: 'DESC' },
        relations: ['accommodation_rooms', 'accommodation_peak_season']
      })

      const final_accommodation_list: AccommodationList[] = []

      for (const accommodation of accommodation_list) {
        const accommodation_images = await this.imagesRepository.find({
          where: { target_id: accommodation.id, category: 2 },
          order: { seq: 'ASC' }
        })
        final_accommodation_list.push({ ...accommodation, accommodation_images })
      }

      return { count: accommodation_count, rows: final_accommodation_list };
    } catch (err) {
      throw new Error(err)
    }
  }
}
