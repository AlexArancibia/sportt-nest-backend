import { IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExchangeRateDto {
  @IsString()
  fromCurrencyId: string;

  @IsString()
  toCurrencyId: string;

  @IsNumber()
  rate: number;

  @IsDate()
  @Type(() => Date)
  effectiveDate: Date;
}