import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { FILE_UPLOADS_DIR } from 'lib/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CollectionModule } from './collection/collection.module';
import { CouponModule } from './coupon/coupon.module';
import { ShippingmethodModule } from './shippingmethod/shippingmethod.module';
 

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'files'), // Asegúrate de que la carpeta sea correcta
      serveRoot: '/uploads', // La URL base para acceder a las imágenes
    }),
    PrismaModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    CouponModule,
    AuthModule,
    FileModule,
    CollectionModule,
    MulterModule.register({
      dest: FILE_UPLOADS_DIR,
      limits:{
        fileSize: 1000 * 1000 * 10,
      }
    }),
    CouponModule,
    ShippingmethodModule
  ],
})
export class AppModule {}
