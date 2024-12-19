import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Crear un producto con variantes
  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        variants: {
          create: createProductDto.variants || [], // Crea variantes asociadas, si las hay
        },
      },
      include: {
        variants: true, // Retorna el producto con sus variantes
      },
    });

    return product;
  }

  // Obtener todos los productos con sus relaciones
  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true, // Incluye la categoría del producto
        variants: true, // Incluye las variantes del producto
      },
    });
  }

  // Obtener un producto por ID con sus relaciones
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true, // Incluye la categoría del producto
        variants: true, // Incluye las variantes del producto
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // Actualizar un producto con sus variantes
  async update(id: string, updateProductDto: UpdateProductDto) {
    const { variants, ...productData } = updateProductDto;

    // Actualiza el producto base
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        variants: {
          deleteMany: {}, // Elimina las variantes existentes
          create: variants || [], // Crea las nuevas variantes
        },
      },
      include: {
        variants: true, // Retorna el producto actualizado con variantes
      },
    });

    return product;
  }

  // Eliminar un producto por ID
  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
