import { Module } from '@nestjs/common';
import { StarsService } from './stars.service';
import { StarsController } from './stars.controller';

@Module({
  controllers: [StarsController],
  providers: [StarsService]
})
export class StarsModule {}
