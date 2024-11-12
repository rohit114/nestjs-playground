import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MymemoryModule } from './mymemory/mymemory.module';

@Module({
  imports: [MymemoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
