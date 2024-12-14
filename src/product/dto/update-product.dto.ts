import { IsOptional, IsUUID, IsDecimal, IsInt, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  isArchived?: boolean;
}
