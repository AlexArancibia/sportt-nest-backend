import { IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { UserRole } from '@prisma/client';  // Asegúrate de que el tipo UserRole está importado correctamente

export class UpdateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
  newPassword?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;  // Si no se pasa, se mantendrá el rol actual
}
