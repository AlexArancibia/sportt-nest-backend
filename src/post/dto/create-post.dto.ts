import { IsString, IsEnum, IsOptional, IsDate, IsArray, IsUUID, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { PostStatus } from '@prisma/client'
import { PostType } from '@prisma/client'

export class CreatePostDto {
  @IsString()
  title: string

  @IsString()
  slug: string

  @IsEnum(PostType)
  type: PostType

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus

  @IsString()
  content: string // This will be JSON, but we'll validate it as a string

  @IsUUID()
  authorId: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedAt?: Date

  @IsOptional()
  @IsString()
  featuredImage?: string

  @IsOptional()
  @IsString()
  metaTitle?: string

  @IsOptional()
  @IsString()
  metaDescription?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  postCategoryIds?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  tagIds?: string[]
}

