import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShippingMethodsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createShippingMethodDto: CreateShippingMethodDto) {
    return this.prisma.shippingMethod.create({
      data: createShippingMethodDto,
    })
  }

  async findAll() {
    return this.prisma.shippingMethod.findMany()
  }

  async findOne(id: string) {
    const shippingMethod = await this.prisma.shippingMethod.findUnique({
      where: { id },
    })

    if (!shippingMethod) {
      throw new NotFoundException(`Shipping method with ID ${id} not found`)
    }

    return shippingMethod
  }

  async update(id: string, updateShippingMethodDto: UpdateShippingMethodDto) {
    try {
      return await this.prisma.shippingMethod.update({
        where: { id },
        data: updateShippingMethodDto,
      })
    } catch (error) {
      throw new NotFoundException(`Shipping method with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.shippingMethod.delete({
        where: { id },
      })
    } catch (error) {
      throw new NotFoundException(`Shipping method with ID ${id} not found`)
    }
  }
}