import { Test, TestingModule } from '@nestjs/testing';
import { EntireMenuService } from './entire_menu.service';

describe('EntireMenuService', () => {
  let service: EntireMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntireMenuService],
    }).compile();

    service = module.get<EntireMenuService>(EntireMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
