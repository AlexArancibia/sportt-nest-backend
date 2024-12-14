import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto'; // Usamos el módulo nativo de Node.js

export const fileNameEditor = (
  req: Request, 
  file: Express.Multer.File, 
  callback: (error: any, filename: string) => void,
) => {
  // Obtén la extensión del archivo
  const fileExtension = file.originalname.split('.').pop();
  
  // Genera un nombre de archivo único usando randomBytes (12 bytes) y recorta para tener un nombre más corto
  const fileName = `${randomBytes(6).toString('hex')}-${file.originalname.slice(0, 8)}.${fileExtension}`;
  
  // Limita el nombre del archivo a 20 caracteres si es necesario
 
  
  callback(null, fileName); // Devuelve el nuevo nombre de archivo
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
