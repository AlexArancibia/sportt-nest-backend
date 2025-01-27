import { Module } from '@nestjs/common';
import { CouponsService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponController],
  providers: [CouponsService],
})
export class CouponModule {}
