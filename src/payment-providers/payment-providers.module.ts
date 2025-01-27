import { Module } from '@nestjs/common';
import { PaymentProvidersService } from './payment-providers.service';
import { PaymentProvidersController } from './payment-providers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentProvidersController],
  providers: [PaymentProvidersService],
})
export class PaymentProvidersModule {}
