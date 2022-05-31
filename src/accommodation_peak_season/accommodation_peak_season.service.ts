import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccommodationPeakSeasonDto } from './dto/create-accommodation_peak_season.dto';
import { AccommodationPeakSeason } from './entities/accommodation_peak_season.entity';
import { AccommodationPeakSeasonRepository } from './entities/accommodation_peak_season.repository';

@Injectable()
export class AccommodationPeakSeasonService {
  constructor(
    @InjectRepository(AccommodationPeakSeasonRepository)
    private accommodationPeakSeasonRepository: AccommodationPeakSeasonRepository
  ) { }

  public async create(data: CreateAccommodationPeakSeasonDto[]): Promise<AccommodationPeakSeason[]> {
    const seasons: AccommodationPeakSeason[] = []

    for (const season_data of data) {
      const season = await this.accommodationPeakSeasonRepository.save(season_data);
      seasons.push(season)
    }

    return seasons;
  }
}
