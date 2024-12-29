import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsBoolean, IsArray, IsString as IsArrayString } from 'class-validator';
import { CreateCollectionDto } from './create-collection.dto';

 

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}