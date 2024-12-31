import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PublicKeyGuard } from 'src/auth/guards/public.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }
  @UseGuards(PublicKeyGuard)
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }
  @UseGuards(PublicKeyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionService.update(id, updateCollectionDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(id);
  }
}
