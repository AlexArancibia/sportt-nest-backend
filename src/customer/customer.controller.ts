import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';
import { CustomerAuthGuard } from './guards/customer.guard';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Controller('customers')

export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}
  @UseGuards(PublicKeyGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
  @UseGuards(PublicKeyGuard)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }
  @UseGuards(PublicKeyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
  @UseGuards(PublicKeyGuard)
  @Post('login')
  login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customersService.login(loginCustomerDto);
  }

  @UseGuards(CustomerAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }
  @UseGuards(CustomerAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}