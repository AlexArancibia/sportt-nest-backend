import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRateService {
  constructor(private prisma: PrismaService) {}

  async create(createExchangeRateDto: CreateExchangeRateDto) {
    const { fromCurrencyId, toCurrencyId, rate, effectiveDate } = createExchangeRateDto;

    try {
      return await this.prisma.exchangeRate.create({
        data: {
          fromCurrency: { connect: { id: fromCurrencyId } },
          toCurrency: { connect: { id: toCurrencyId } },
          rate,
          effectiveDate,
        },
        include: {
          fromCurrency: true,
          toCurrency: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('An exchange rate for these currencies and date already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.exchangeRate.findMany({
      include: {
        fromCurrency: true,
        toCurrency: true,
      },
    });
  }

  async findOne(id: string) {
    const exchangeRate = await this.prisma.exchangeRate.findUnique({
      where: { id },
      include: {
        fromCurrency: true,
        toCurrency: true,
      },
    });

    if (!exchangeRate) {
      throw new NotFoundException(`Exchange rate with ID ${id} not found`);
    }

    return exchangeRate;
  }

  async update(id: string, updateExchangeRateDto: UpdateExchangeRateDto) {
    const { fromCurrencyId, toCurrencyId, ...updateData } = updateExchangeRateDto;

    try {
      return await this.prisma.exchangeRate.update({
        where: { id },
        data: {
          ...updateData,
          ...(fromCurrencyId && { fromCurrency: { connect: { id: fromCurrencyId } } }),
          ...(toCurrencyId && { toCurrency: { connect: { id: toCurrencyId } } }),
        },
        include: {
          fromCurrency: true,
          toCurrency: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Exchange rate with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('An exchange rate for these currencies and date already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.exchangeRate.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Exchange rate with ID ${id} not found`);
      }
      throw error;
    }
  }
}

