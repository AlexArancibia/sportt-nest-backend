import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @UseGuards(PublicKeyGuard)
  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @UseGuards(PublicKeyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(id, updateShopDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/currencies/:currencyId')
  addAcceptedCurrency(@Param('id') id: string, @Param('currencyId') currencyId: string) {
    return this.shopService.addAcceptedCurrency(id, currencyId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/currencies/:currencyId')
  removeAcceptedCurrency(@Param('id') id: string, @Param('currencyId') currencyId: string) {
    return this.shopService.removeAcceptedCurrency(id, currencyId);
  }
}

