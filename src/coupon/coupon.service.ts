import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponDto: CreateCouponDto) {
    const { applicableProductIds, applicableCategoryIds, applicableCollectionIds, ...couponData } = createCouponDto

    return this.prisma.coupon.create({
      data: {
        ...couponData,
        applicableProducts: {
          connect: applicableProductIds?.map((id) => ({ id })) || [],
        },
        applicableCategories: {
          connect: applicableCategoryIds?.map((id) => ({ id })) || [],
        },
        applicableCollections: {
          connect: applicableCollectionIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        applicableProducts: true,
        applicableCategories: true,
        applicableCollections: true,
      },
    })
  }

  async findAll() {
    return this.prisma.coupon.findMany({
      include: {
        applicableProducts: true,
        applicableCategories: true,
        applicableCollections: true,
      },
    })
  }

  async findOne(id: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
      include: {
        applicableProducts: true,
        applicableCategories: true,
        applicableCollections: true,
      },
    })

    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`)
    }

    return coupon
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const { applicableProductIds, applicableCategoryIds, applicableCollectionIds, ...updateData } = updateCouponDto

    try {
      return await this.prisma.coupon.update({
        where: { id },
        data: {
          ...updateData,
          applicableProducts: {
            set: applicableProductIds?.map((id) => ({ id })) || [],
          },
          applicableCategories: {
            set: applicableCategoryIds?.map((id) => ({ id })) || [],
          },
          applicableCollections: {
            set: applicableCollectionIds?.map((id) => ({ id })) || [],
          },
        },
        include: {
          applicableProducts: true,
          applicableCategories: true,
          applicableCollections: true,
        },
      })
    } catch (error) {
      throw new NotFoundException(`Coupon with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.coupon.delete({
        where: { id },
      })
    } catch (error) {
      throw new NotFoundException(`Coupon with ID ${id} not found`)
    }
  }
}

