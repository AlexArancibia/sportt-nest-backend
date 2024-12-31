import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    return this.prisma.currency.create({
      data: createCurrencyDto,
    });
  }

  async findAll() {
    return this.prisma.currency.findMany();
  }

  async findOne(id: string) {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }

    return currency;
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    try {
      return await this.prisma.currency.update({
        where: { id },
        data: updateCurrencyDto,
      });
    } catch (error) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.currency.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
  }
}

