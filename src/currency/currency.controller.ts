import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';
 

@Controller('currencies')

export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }
  @UseGuards(PublicKeyGuard)
  @Get()
  findAll() {
    return this.currencyService.findAll();
  }
  @UseGuards(PublicKeyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.update(id, updateCurrencyDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(id);
  }
}