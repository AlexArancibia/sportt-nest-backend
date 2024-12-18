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
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicKeyGuard } from '../auth/guards/public.guard';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  // Crear un nuevo artículo dentro de una orden (Protegido por AuthGuard)
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  // Obtener todos los artículos dentro de las órdenes (Protegido por PublicKeyGuard)
  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.orderItemsService.findAll();
  }

  // Obtener un artículo por ID (Protegido por PublicKeyGuard)
  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(id);
  }

  // Actualizar un artículo dentro de una orden (Protegido por AuthGuard)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  // Eliminar un artículo de una orden (Protegido por AuthGuard)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(id);
  }
}
