import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { UpdatePaymentTransactionDto } from './dto/update-payment-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentTransactionDto: CreatePaymentTransactionDto) {
    const { orderId, paymentProviderId, currencyId, ...transactionData } = createPaymentTransactionDto

    return this.prisma.paymentTransaction.create({
      data: {
        ...transactionData,
        order: { connect: { id: orderId } },
        paymentProvider: { connect: { id: paymentProviderId } },
        currency: { connect: { id: currencyId } },
      },
      include: {
        order: true,
        paymentProvider: true,
        currency: true,
      },
    })
  }

  async findAll() {
    return this.prisma.paymentTransaction.findMany({
      include: {
        order: true,
        paymentProvider: true,
        currency: true,
      },
    })
  }

  async findOne(id: string) {
    const paymentTransaction = await this.prisma.paymentTransaction.findUnique({
      where: { id },
      include: {
        order: true,
        paymentProvider: true,
        currency: true,
      },
    })

    if (!paymentTransaction) {
      throw new NotFoundException(`Payment transaction with ID ${id} not found`)
    }

    return paymentTransaction
  }

  async update(id: string, updatePaymentTransactionDto: UpdatePaymentTransactionDto) {
    const { orderId, paymentProviderId, currencyId, ...updateData } = updatePaymentTransactionDto

    try {
      return await this.prisma.paymentTransaction.update({
        where: { id },
        data: {
          ...updateData,
          ...(orderId && { order: { connect: { id: orderId } } }),
          ...(paymentProviderId && { paymentProvider: { connect: { id: paymentProviderId } } }),
          ...(currencyId && { currency: { connect: { id: currencyId } } }),
        },
        include: {
          order: true,
          paymentProvider: true,
          currency: true,
        },
      })
    } catch (error) {
      throw new NotFoundException(`Payment transaction with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.paymentTransaction.delete({
        where: { id },
      })
    } catch (error) {
      throw new NotFoundException(`Payment transaction with ID ${id} not found`)
    }
  }
}

