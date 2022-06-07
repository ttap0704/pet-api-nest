import { Test, TestingModule } from '@nestjs/testing';
import { EntireMenuController } from './entire_menu.controller';

describe('EntireMenuController', () => {
  let controller: EntireMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntireMenuController],
    }).compile();

    controller = module.get<EntireMenuController>(EntireMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
