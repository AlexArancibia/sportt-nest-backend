import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo cupón
  async create(createCouponDto: CreateCouponDto) {
    return this.prisma.coupon.create({
      data: {
        ...createCouponDto,
        // No need to stringify, Prisma handles JSON fields
        conditions: createCouponDto.conditions || null,
      },
    });
  }

  // Obtener todos los cupones
  async findAll() {
    return this.prisma.coupon.findMany({
      include: {
        orders: true, // Incluir órdenes asociadas
      },
    });
  }

  // Obtener un cupón por ID
  async findOne(id: string) {
    return this.prisma.coupon.findUnique({
      where: { id },
      include: {
        orders: true, // Incluir órdenes asociadas
      },
    });
  }

  // Actualizar un cupón
  async update(id: string, updateCouponDto: UpdateCouponDto) {
    return this.prisma.coupon.update({
      where: { id },
      data: {
        ...updateCouponDto,
        // Handle conditions update
        conditions: updateCouponDto.conditions || undefined,
      },
    });
  }

  // Eliminar un cupón
  async remove(id: string) {
    return this.prisma.coupon.delete({
      where: { id },
    });
  }
}

