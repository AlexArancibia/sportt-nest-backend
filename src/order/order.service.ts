import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderFinancialStatus, OrderFulfillmentStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { lineItems, ...orderData } = createOrderDto

    // Start a transaction
    return this.prisma.$transaction(async (prisma) => {
      // Create the order
      const order = await prisma.order.create({
        data: {
          ...orderData,
          orderNumber: await this.generateOrderNumber(prisma),
        },
      })

      // Create order items
      if (lineItems && lineItems.length > 0) {
        await prisma.orderItem.createMany({
          data: lineItems.map((item) => ({
            ...item,
            orderId: order.id,
          })),
        })
      }

      // Fetch the created order with all related data
      return this.findOne(order.id)
    })
  }

  async findAll(params: {
    financialStatus?: OrderFinancialStatus
    fulfillmentStatus?: OrderFulfillmentStatus
    customerId?: string
  }) {
    const { financialStatus, fulfillmentStatus, customerId } = params
    return this.prisma.order.findMany({
      where: {
        financialStatus,
        fulfillmentStatus,
        customerId,
      },
      include: {
        customer: true,
        lineItems: true,
        shippingAddress: true,
        billingAddress: true,
        coupon: true,
        paymentProvider: true,
        shippingMethod: true,
      },
    })
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        lineItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
        coupon: true,
        paymentProvider: true,
        shippingMethod: true,
        refunds: true,
      },
    })

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }

    return order
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { lineItems, ...orderData } = updateOrderDto

    // Start a transaction
    return this.prisma.$transaction(async (prisma) => {
      // Update the order
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: orderData,
      })

      // Update order items
      if (lineItems) {
        // Delete existing order items
        await prisma.orderItem.deleteMany({
          where: { orderId: id },
        })

        // Create new order items
        await prisma.orderItem.createMany({
          data: lineItems.map((item) => ({
            ...item,
            orderId: id,
          })),
        })
      }

      // Fetch the updated order with all related data
      return this.findOne(updatedOrder.id)
    })
  }

  async remove(id: string) {
    try {
      await this.prisma.order.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }
  }

  private async generateOrderNumber(prisma: Prisma.TransactionClient): Promise<number> {
    const lastOrder = await prisma.order.findFirst({
      orderBy: { orderNumber: "desc" },
      select: { orderNumber: true },
    })

    return (lastOrder?.orderNumber || 0) + 1
  }
}

