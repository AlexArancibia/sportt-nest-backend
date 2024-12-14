import { IsString, IsUUID, IsDecimal, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsOptional()
  isArchived?: boolean;
}
