import { Test, TestingModule } from '@nestjs/testing';
import { JoinCertificationService } from './join_certification.service';

describe('JoinCertificationService', () => {
  let service: JoinCertificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinCertificationService],
    }).compile();

    service = module.get<JoinCertificationService>(JoinCertificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
