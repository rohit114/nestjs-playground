import { Module } from '@nestjs/common';
import { PubsubController } from './controllers/shipment.controller';
import { ShipmentService } from './services/shipment.service';
import { MyMemory } from './core/mymemory';

@Module({
  providers: [ShipmentService, ShipmentService, MyMemory],
  controllers: [PubsubController]
})
export class ShipmentModule {}
