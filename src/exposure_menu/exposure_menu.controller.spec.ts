import { Test, TestingModule } from '@nestjs/testing';
import { ExposureMenuController } from './exposure_menu.controller';

describe('ExposureMenuController', () => {
  let controller: ExposureMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExposureMenuController],
    }).compile();

    controller = module.get<ExposureMenuController>(ExposureMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
