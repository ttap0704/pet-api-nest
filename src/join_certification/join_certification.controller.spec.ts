import { Test, TestingModule } from '@nestjs/testing';
import { JoinCertificationController } from './join_certification.controller';

describe('JoinCertificationController', () => {
  let controller: JoinCertificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinCertificationController],
    }).compile();

    controller = module.get<JoinCertificationController>(JoinCertificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
