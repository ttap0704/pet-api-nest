import { Test, TestingModule } from '@nestjs/testing';
import { ExposureMenuService } from './exposure_menu.service';

describe('ExposureMenuService', () => {
  let service: ExposureMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExposureMenuService],
    }).compile();

    service = module.get<ExposureMenuService>(ExposureMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
