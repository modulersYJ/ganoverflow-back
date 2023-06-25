import { Test, TestingModule } from '@nestjs/testing';
import { StarsController } from './stars.controller';
import { StarsService } from './stars.service';

describe('StarsController', () => {
  let controller: StarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarsController],
      providers: [StarsService],
    }).compile();

    controller = module.get<StarsController>(StarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
