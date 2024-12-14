import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  // Importa PrismaService
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Crear una nueva orden
  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  // Obtener todas las órdenes
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        orderItems: true,  // Incluir los productos asociados a la orden
        customer: true,    // Incluir la información del cliente
      },
    });
  }

  // Obtener una orden por ID
  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,  // Incluir los productos asociados a la orden
        customer: true,    // Incluir la información del cliente
      },
    });
  }

  // Actualizar una orden
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  // Eliminar una orden
  async remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
