import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
 
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { FILE_UPLOADS_DIR } from 'lib/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CollectionModule } from './collection/collection.module';
import { CurrencyModule } from './currency/currency.module';
import { ShopModule } from './shop/shop.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { ProductModule } from './product/product.module';
 import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { PaymentProvidersModule } from './payment-providers/payment-providers.module';
import { PaymentTransactionModule } from './payment-transaction/payment-transaction.module';
import { CouponModule } from './coupon/coupon.module';
import { RefundModule } from './refund/refund.module';
import { PostModule } from './post/post.module';
import { HeroSectionModule } from './hero-section/hero-section.module';
 
 

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'files'), // Asegúrate de que la carpeta sea correcta
      serveRoot: '/uploads', // La URL base para acceder a las imágenes
    }),
    PrismaModule,
    CategoryModule,
 
    CustomerModule,
 
    AuthModule,
    FileModule,
 
    MulterModule.register({
      dest: FILE_UPLOADS_DIR,
      limits:{
        fileSize: 1000 * 1000 * 10,
      }
    }),
 
    CollectionModule,
 
    CurrencyModule,
 
    ShopModule,
 
    ExchangeRateModule,
 
    ProductModule,
 
    ShippingMethodsModule,
 
    PaymentProvidersModule,
 
    PaymentTransactionModule,
 
    CouponModule,
 
    RefundModule,
 
    PostModule,
 
    HeroSectionModule,
 
  ],
})
export class AppModule {}
