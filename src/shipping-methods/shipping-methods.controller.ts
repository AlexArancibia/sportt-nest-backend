import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';

@Controller('shipping-methods')
export class ShippingMethodsController {
  constructor(private readonly shippingMethodsService: ShippingMethodsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodsService.create(createShippingMethodDto);
  }

  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.shippingMethodsService.findAll()
  }

  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.shippingMethodsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateShippingMethodDto: UpdateShippingMethodDto) {
    return this.shippingMethodsService.update(id, updateShippingMethodDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.shippingMethodsService.remove(id);
  }
}
