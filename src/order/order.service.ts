import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        customerId: createOrderDto.customerId,
        isPaid: createOrderDto.isPaid,
        phone: createOrderDto.phone,
        address: createOrderDto.address,
        discount: createOrderDto.discount,
        couponId: createOrderDto.couponId,
        orderItems: {
          create: createOrderDto.orderItems.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        coupon: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        coupon: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        coupon: true,
      },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        isPaid: updateOrderDto.isPaid,
        phone: updateOrderDto.phone,
        address: updateOrderDto.address,
        discount: updateOrderDto.discount,
        couponId: updateOrderDto.couponId,
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        coupon: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}

