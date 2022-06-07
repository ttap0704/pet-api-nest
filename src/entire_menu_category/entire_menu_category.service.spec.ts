import { Test, TestingModule } from '@nestjs/testing';
import { EntireMenuCategoryService } from './entire_menu_category.service';

describe('EntireMenuCategoryService', () => {
  let service: EntireMenuCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntireMenuCategoryService],
    }).compile();

    service = module.get<EntireMenuCategoryService>(EntireMenuCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
