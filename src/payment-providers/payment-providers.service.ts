import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentProviderDto } from './dto/create-payment-provider.dto';
import { UpdatePaymentProviderDto } from './dto/update-payment-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentProvidersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaymentProviderDto: CreatePaymentProviderDto) {

    
    const { currencyId, ...providerData } = createPaymentProviderDto

    const currency = await this.prisma.currency.findUnique({
      where: { id: currencyId },
    })

    if (!currency) {
      throw new NotFoundException(`Currency with ID ${currencyId} not found`)
    }

    
    return this.prisma.paymentProvider.create({
      data: {
        ...providerData,
        currency: { connect: { id: currencyId } },
      },
      include: { currency: true },
    })
  }

  async findAll() {
    return this.prisma.paymentProvider.findMany({
      include: { currency: true },
    })
  }

  async findOne(id: string) {
    const paymentProvider = await this.prisma.paymentProvider.findUnique({
      where: { id },
      include: { currency: true },
    })

    if (!paymentProvider) {
      throw new NotFoundException(`Payment provider with ID ${id} not found`)
    }

    return paymentProvider
  }

  async update(id: string, updatePaymentProviderDto: UpdatePaymentProviderDto) {
    const { currencyId, ...updateData } = updatePaymentProviderDto

    try {
      return await this.prisma.paymentProvider.update({
        where: { id },
        data: {
          ...updateData,
          ...(currencyId && { currency: { connect: { id: currencyId } } }),
        },
        include: { currency: true },
      })
    } catch (error) {
      throw new NotFoundException(`Payment provider with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.paymentProvider.delete({
        where: { id },
      })
    } catch (error) {
      throw new NotFoundException(`Payment provider with ID ${id} not found`)
    }
  }
}
