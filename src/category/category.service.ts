import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
 
@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // Crear una nueva categoría
  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  // Obtener todas las categorías
  async findAll() {
    return this.prisma.category.findMany({
      include: {
        children: true,  // Incluir subcategorías
        products: true,  // Incluir productos asociados
      },
    });
  }

  // Obtener una categoría por ID
  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,  // Incluir subcategorías
        products: true,  // Incluir productos asociados
      },
    });
  }

  // Actualizar una categoría
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  // Eliminar una categoría
  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
