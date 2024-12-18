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
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicKeyGuard } from '../auth/guards/public.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Crear una nueva orden (Protegido por AuthGuard)
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // Obtener todas las órdenes (Protegido por PublicKeyGuard)
  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  // Obtener una orden por ID (Protegido por PublicKeyGuard)
  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // Actualizar una orden (Protegido por AuthGuard)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  // Eliminar una orden (Protegido por AuthGuard)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
