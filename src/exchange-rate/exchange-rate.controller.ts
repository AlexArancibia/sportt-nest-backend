import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';

@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
    return this.exchangeRateService.create(createExchangeRateDto);
  }

  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.exchangeRateService.findAll();
  }

  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.exchangeRateService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateExchangeRateDto: UpdateExchangeRateDto) {
    return this.exchangeRateService.update(id, updateExchangeRateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.exchangeRateService.remove(id);
  }
}

