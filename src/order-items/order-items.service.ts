import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  // Importa PrismaService
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo artículo en la orden
  async create(createOrderItemDto: CreateOrderItemDto) {
    return this.prisma.orderItems.create({
      data: createOrderItemDto,
    });
  }

  // Obtener todos los artículos de todas las órdenes
  async findAll() {
    return this.prisma.orderItems.findMany({
      include: {
        order: true,  // Incluir la información de la orden
        product: true,  // Incluir la información del producto
      },
    });
  }

  // Obtener un artículo por ID
  async findOne(id: string) {
    return this.prisma.orderItems.findUnique({
      where: { id },
      include: {
        order: true,  // Incluir la información de la orden
        product: true,  // Incluir la información del producto
      },
    });
  }

  // Actualizar un artículo en una orden
  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prisma.orderItems.update({
      where: { id },
      data: updateOrderItemDto,
    });
  }

  // Eliminar un artículo de una orden
  async remove(id: string) {
    return this.prisma.orderItems.delete({
      where: { id },
    });
  }
}
