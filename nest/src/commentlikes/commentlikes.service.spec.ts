import { Test, TestingModule } from '@nestjs/testing';
import { CommentlikesService } from './commentlikes.service';

describe('CommentlikesService', () => {
  let service: CommentlikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentlikesService],
    }).compile();

    service = module.get<CommentlikesService>(CommentlikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
