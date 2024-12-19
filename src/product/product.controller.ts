import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
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

  // Crear un producto con portada y galería
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Obtener todos los productos con relaciones
  @Get()
  @UseGuards(PublicKeyGuard)
  async findAll() {
    return this.productService.findAll();
  }

  // Obtener un producto específico con relaciones
  @Get(':id')
  @UseGuards(PublicKeyGuard)
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  // Actualizar un producto con portada y galería
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // Eliminar un producto por ID
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
