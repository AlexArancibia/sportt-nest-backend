import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.CUSTOMER_JWT_SECRET,
      signOptions: { expiresIn: '5d' }
    })
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}