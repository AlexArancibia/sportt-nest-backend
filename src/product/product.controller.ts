import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(PublicKeyGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(PublicKeyGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

