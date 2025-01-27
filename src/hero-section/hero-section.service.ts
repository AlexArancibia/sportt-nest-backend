import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HeroSectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHeroSectionDto: CreateHeroSectionDto) {
    return this.prisma.heroSection.create({
      data: createHeroSectionDto,
    })
  }

  async findAll() {
    return this.prisma.heroSection.findMany()
  }

  async findOne(id: string) {
    const heroSection = await this.prisma.heroSection.findUnique({
      where: { id },
    })

    if (!heroSection) {
      throw new NotFoundException(`HeroSection with ID ${id} not found`)
    }

    return heroSection
  }

  async update(id: string, updateHeroSectionDto: UpdateHeroSectionDto) {
    try {
      return await this.prisma.heroSection.update({
        where: { id },
        data: updateHeroSectionDto,
      })
    } catch (error) {
      throw new NotFoundException(`HeroSection with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.heroSection.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`HeroSection with ID ${id} not found`)
    }
  }
}

