import { Test, TestingModule } from '@nestjs/testing';
import { StarsService } from './stars.service';

describe('StarsService', () => {
  let service: StarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarsService],
    }).compile();

    service = module.get<StarsService>(StarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
