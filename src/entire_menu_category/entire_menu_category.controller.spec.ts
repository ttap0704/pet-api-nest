import { Test, TestingModule } from '@nestjs/testing';
import { EntireMenuCategoryController } from './entire_menu_category.controller';

describe('EntireMenuCategoryController', () => {
  let controller: EntireMenuCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntireMenuCategoryController],
    }).compile();

    controller = module.get<EntireMenuCategoryController>(EntireMenuCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
