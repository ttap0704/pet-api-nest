import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminAccommodationDto } from 'src/admin/dto/create-admin_accommodation.dto';
import { CreateAccommodationPeakSeasonDto } from './dto/create-accommodation_peak_season.dto';
import { AccommodationPeakSeason } from './entities/accommodation_peak_season.entity';
import { AccommodationPeakSeasonRepository } from './entities/accommodation_peak_season.repository';

@Injectable()
export class AccommodationPeakSeasonService {
  constructor(
    @InjectRepository(AccommodationPeakSeasonRepository)
    private accommodationPeakSeasonRepository: AccommodationPeakSeasonRepository
  ) { }

  public async updateSeasons(accommodation_id: number, season: CreateAccommodationPeakSeasonDto[]) {
    await this.accommodationPeakSeasonRepository.delete({ accommodation_id })

    const insert_data: CreateAccommodationPeakSeasonDto[] = season.map(item => {
      return {
        ...item,
        accommodation_id
      }
    })

    const new_seasons: AccommodationPeakSeason[] = await this.accommodationPeakSeasonRepository.createAccommodationPeakSeasons(insert_data)

    return new_seasons;
  }
}
