import { IsString, IsOptional, IsBoolean, IsArray, IsString as IsArrayString } from 'class-validator';

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsArray()
  @IsOptional()
  @IsArrayString({ each: true })  // Valida que cada elemento en el array sea un string
  productIds?: string[];  // Este campo es opcional y debe ser un arreglo de IDs de productos
}
