import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShippingMethodService } from './shippingmethod.service';
import { CreateShippingMethodDto } from './dto/create-shippingmethod.dto';
import { UpdateShippingMethodDto } from './dto/update-shippingmethod.dto';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';
@UseGuards(PublicKeyGuard)
@Controller('shippingmethod')
export class ShippingmethodController {
  constructor(private readonly shippingmethodService: ShippingMethodService) {}

  @Post()
  create(@Body() createShippingmethodDto: CreateShippingMethodDto) {
    return this.shippingmethodService.create(createShippingmethodDto);
  }

  @Get()
  findAll() {
    return this.shippingmethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingmethodService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingmethodDto: UpdateShippingMethodDto) {
    return this.shippingmethodService.update(id, updateShippingmethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingmethodService.remove(id);
  }
}
