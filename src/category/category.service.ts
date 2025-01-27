import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Crear una nueva categoría
  async create(createCategoryDto: CreateCategoryDto) {
    const { parentId, ...categoryData } = createCategoryDto

    return this.prisma.category.create({
      data: {
        ...categoryData,
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
      include: {
        parent: true,
        children: true,
        products: true,
      },
    })
  }

  // Obtener todas las categorías
  async findAll() {
    return this.prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        products: true,
      },
    })
  }

  // Obtener una categoría por ID
  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: true,
      },
    })

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    return category
  }

  // Actualizar una categoría
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { parentId, ...categoryData } = updateCategoryDto

    // Check if the category exists
    const existingCategory = await this.prisma.category.findUnique({ where: { id } })
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...categoryData,
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
      include: {
        parent: true,
        children: true,
        products: true,
      },
    })
  }

  // Eliminar una categoría
  async remove(id: string) {
    // Check if the category exists
    const existingCategory = await this.prisma.category.findUnique({ where: { id } })
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    // Check if the category has children
    const childrenCount = await this.prisma.category.count({
      where: { parentId: id },
    })

    if (childrenCount > 0) {
      throw new Error("Cannot delete a category with child categories")
    }

    return this.prisma.category.delete({
      where: { id },
    })
  }

}

