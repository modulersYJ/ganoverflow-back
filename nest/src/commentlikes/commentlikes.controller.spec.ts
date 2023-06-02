import { Test, TestingModule } from '@nestjs/testing';
import { CommentlikesController } from './commentlikes.controller';
import { CommentlikesService } from './commentlikes.service';

describe('CommentlikesController', () => {
  let controller: CommentlikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentlikesController],
      providers: [CommentlikesService],
    }).compile();

    controller = module.get<CommentlikesController>(CommentlikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
