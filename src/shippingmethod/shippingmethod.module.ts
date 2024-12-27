import { Module } from '@nestjs/common';
import { ShippingMethodService } from './shippingmethod.service';
import { ShippingmethodController } from './shippingmethod.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShippingmethodController],
  providers: [ShippingMethodService],
})
export class ShippingmethodModule {}
