import { IsString, IsEnum, IsInt, IsBoolean, Min, Max } from 'class-validator';
import { CurrencyPosition } from '@prisma/client';

export class CreateCurrencyDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsInt()
  @Min(0)
  @Max(10)
  decimalPlaces: number;

  @IsEnum(CurrencyPosition)
  symbolPosition: CurrencyPosition;

  @IsBoolean()
  isActive: boolean;
}

