import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

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
}
