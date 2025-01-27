import { IsString, IsOptional, IsBoolean, IsDate, IsNumber, IsJSON } from "class-validator"
import { Type } from "class-transformer"

export class CreateHeroSectionDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  subtitle?: string

  @IsOptional()
  @IsString()
  backgroundImage?: string

  @IsOptional()
  @IsString()
  mobileBackgroundImage?: string

  @IsOptional()
  @IsString()
  buttonText?: string

  @IsOptional()
  @IsString()
  buttonLink?: string

  @IsOptional()
  @IsString()
  alignment?: string

  @IsOptional()
  @IsString()
  textColor?: string

  @IsOptional()
  @IsString()
  backgroundColor?: string

  @IsOptional()
  @IsNumber()
  overlayOpacity?: number

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date

  @IsOptional()
  @IsJSON()
  customFields?: Record<string, any>
}

