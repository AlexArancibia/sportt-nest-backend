import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShippingMethodDto } from './dto/create-shippingmethod.dto';
import { UpdateShippingMethodDto } from './dto/update-shippingmethod.dto';

@Injectable()
export class ShippingMethodService {
  constructor(private prisma: PrismaService) {}

  async create(createShippingMethodDto: CreateShippingMethodDto) {
    return this.prisma.shippingMethod.create({
      data: createShippingMethodDto,
    });
  }

  async findAll() {
    return this.prisma.shippingMethod.findMany();
  }

  async findOne(id: string) {
    return this.prisma.shippingMethod.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateShippingMethodDto: UpdateShippingMethodDto) {
    return this.prisma.shippingMethod.update({
      where: { id },
      data: updateShippingMethodDto,
    });
  }

  async remove(id: string) {
    return this.prisma.shippingMethod.delete({
      where: { id },
    });
  }
}