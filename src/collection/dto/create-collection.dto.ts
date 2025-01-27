import { IsString, IsOptional, IsUrl, IsArray, IsUUID } from 'class-validator';

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

  @IsArray()
  @IsUUID('4', { each: true })
  productIds: string[];

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string // Meta description for SEO?: string;
}
