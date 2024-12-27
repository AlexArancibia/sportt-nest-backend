import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingMethodDto } from './create-shippingmethod.dto';

export class UpdateShippingMethodDto extends PartialType(CreateShippingMethodDto) {}
