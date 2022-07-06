import { Test, TestingModule } from '@nestjs/testing';
import { UsersTokenService } from './users_token.service';

describe('UsersTokenService', () => {
  let service: UsersTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTokenService],
    }).compile();

    service = module.get<UsersTokenService>(UsersTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
