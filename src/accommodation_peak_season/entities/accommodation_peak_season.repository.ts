import { EntityRepository, Repository } from 'typeorm';
import { CreateAccommodationPeakSeasonDto } from '../dto/create-accommodation_peak_season.dto';
import { AccommodationPeakSeason } from './accommodation_peak_season.entity';

@EntityRepository(AccommodationPeakSeason)
export class AccommodationPeakSeasonRepository extends Repository<AccommodationPeakSeason> {
  public async createAccommodationPeakSeasons(data: CreateAccommodationPeakSeasonDto[]): Promise<AccommodationPeakSeason[]> {
    const seasons: AccommodationPeakSeason[] = []

    console.log(data);
    for (const season_data of data) {
      const season = await this.save(season_data);
      seasons.push(season)
    }

    return seasons;
  }
}