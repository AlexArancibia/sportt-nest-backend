import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefundService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRefundDto: CreateRefundDto) {
    const { lineItems, ...refundData } = createRefundDto

    return this.prisma.refund.create({
      data: {
        ...refundData,
        lineItems: {
          create: lineItems,
        },
      },
      include: {
        lineItems: true,
        order: true,
      },
    })
  }

  async findAll() {
    return this.prisma.refund.findMany({
      include: {
        lineItems: true,
        order: true,
      },
    })
  }

  async findOne(id: string) {
    const refund = await this.prisma.refund.findUnique({
      where: { id },
      include: {
        lineItems: true,
        order: true,
      },
    })

    if (!refund) {
      throw new NotFoundException(`Refund with ID ${id} not found`)
    }

    return refund
  }

  async update(id: string, updateRefundDto: UpdateRefundDto) {
    const { lineItems, ...refundData } = updateRefundDto

    try {
      // First, update the refund data
      const updatedRefund = await this.prisma.refund.update({
        where: { id },
        data: refundData,
      })

      // If lineItems are provided, handle them separately
      if (lineItems && lineItems.length > 0) {
        // Get existing line items
        const existingLineItems = await this.prisma.refundLineItem.findMany({
          where: { refundId: id },
        })

        // Create a map of existing line items by orderItemId
        const existingLineItemMap = new Map(existingLineItems.map((item) => [item.orderItemId, item]))

        // Process each line item in the update DTO
        for (const lineItem of lineItems) {
          if (existingLineItemMap.has(lineItem.orderItemId)) {
            // Update existing line item
            await this.prisma.refundLineItem.update({
              where: { id: existingLineItemMap.get(lineItem.orderItemId).id },
              data: lineItem,
            })
          } else {
            // Create new line item
            await this.prisma.refundLineItem.create({
              data: {
                ...lineItem,
                refundId: id,
              },
            })
          }
        }

        // Remove any line items that are no longer in the update DTO
        const updatedOrderItemIds = new Set(lineItems.map((item) => item.orderItemId))
        for (const [orderItemId, existingItem] of existingLineItemMap) {
          if (!updatedOrderItemIds.has(orderItemId)) {
            await this.prisma.refundLineItem.delete({
              where: { id: existingItem.id },
            })
          }
        }
      }

      // Fetch and return the updated refund with its line items
      return this.findOne(id)
    } catch (error) {
      throw new NotFoundException(`Refund with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.refund.delete({
        where: { id },
      })
    } catch (error) {
      throw new NotFoundException(`Refund with ID ${id} not found`)
    }
  }
}

