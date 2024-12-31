import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';  // Importa PrismaModule
@Module({
  imports: [PrismaModule],  // Asegúrate de que PrismaModule está aquí
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}



