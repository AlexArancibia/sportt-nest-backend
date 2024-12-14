import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoriesController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';  // Importa PrismaModule
@Module({
  imports: [PrismaModule],  // Asegúrate de que PrismaModule está aquí
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoryModule {}



