import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class VariantDto {
  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  attributes: any;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sku?: string; 

  @IsString()
  @IsOptional()
  imageUrl?: string; // Imagen opcional de la variante
}

export class CreateProductDto {
  
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;


  @IsString()
  @IsOptional()
  isActive?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  coverImage?: string; // Imagen de portada

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  galleryImages?: string[]; // Galería de imágenes

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  provider?: string;  

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sku?: string;  

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants?: VariantDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  collections?: VariantDto[];
}
