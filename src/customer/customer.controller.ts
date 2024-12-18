import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // Crear un nuevo cliente (Protegido por AuthGuard)
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  // Obtener todos los clientes (Protegido por PublicKeyGuard)
  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.customersService.findAll();
  }

  // Obtener un cliente por ID (Protegido por PublicKeyGuard)
  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  // Actualizar un cliente (Protegido por AuthGuard)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  // Eliminar un cliente (Protegido por AuthGuard)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
