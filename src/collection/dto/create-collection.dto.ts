import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

