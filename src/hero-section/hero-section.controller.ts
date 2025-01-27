import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Post()
  create(@Body() createHeroSectionDto: CreateHeroSectionDto) {
    return this.heroSectionService.create(createHeroSectionDto);
  }

  @Get()
  findAll() {
    return this.heroSectionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroSectionService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() updateHeroSectionDto: UpdateHeroSectionDto) {
    return this.heroSectionService.update(id, updateHeroSectionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroSectionService.remove(id);
  }
}
