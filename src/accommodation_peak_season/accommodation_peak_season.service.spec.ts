import { Test, TestingModule } from '@nestjs/testing';
import { AccommodationPeakSeasonService } from './accommodation_peak_season.service';

describe('AccommodationPeakSeasonService', () => {
  let service: AccommodationPeakSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccommodationPeakSeasonService],
    }).compile();

    service = module.get<AccommodationPeakSeasonService>(AccommodationPeakSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
