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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicKeyGuard } from '../auth/guards/public.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Crear un producto (Protegido por AuthGuard)
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Obtener todos los productos (Protegido por PublicKeyGuard)
  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.productService.findAll();
  }

  // Obtener un producto por ID (Protegido por PublicKeyGuard)
  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  // Actualizar un producto (Protegido por AuthGuard)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // Eliminar un producto (Protegido por AuthGuard)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
