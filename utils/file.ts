import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

// Tipo de la función fileNameEditor con los tipos correctos
export const fileNameEditor = (
  req: Request, 
  file: Express.Multer.File, // Usa el tipo correcto para el archivo
  callback: (error: any, filename: string) => void,
) => {
  const newFileName = file.originalname; // O puedes generar un nombre único si es necesario
  callback(null, newFileName);
};

// Filtro para verificar el tipo de archivo
export const imageFileFilter = (
  req: Request, 
  file: Express.Multer.File, // También usa el tipo correcto aquí
  callback: (error: any, valid: boolean) => void,
) => {
  if (!file.originalname || !file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    return callback(new BadRequestException('Incorrect File Type'), false);
  }
  callback(null, true);
};
