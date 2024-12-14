import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;  // ID de la categoría principal (si es subcategoría)

  @IsUUID()
  storeId: string;  // ID de la tienda a la que pertenece la categoría
}
