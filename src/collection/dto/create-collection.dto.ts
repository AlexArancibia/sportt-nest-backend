import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // Valida que cada elemento en el array sea un string
  productIds?: string[];
}
