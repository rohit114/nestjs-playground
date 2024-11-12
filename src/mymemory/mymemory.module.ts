import { Module } from '@nestjs/common';
import { MymemoryController } from './mymemory.controller';
import { MymemoryService } from './services/mymemory.service';

@Module({
  controllers: [MymemoryController],
  providers: [MymemoryService]
})
export class MymemoryModule {}
