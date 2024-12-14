import { Controller, Post, UseInterceptors, UploadedFile, Body, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// Importaciones corregidas (usando rutas relativas)
import { FILE_UPLOADS_DIR } from 'lib/constants'; // Ajusta la ruta según corresponda
import { fileNameEditor, imageFileFilter } from 'utils/file'; // Ajusta la ruta según corresponda
import { CreateFileDto } from './dto/create-file.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly imageService: FileService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor, // Usar la función para editar el nombre del archivo
        destination: FILE_UPLOADS_DIR, // Carpeta de destino
      }),
      limits: {
        fileSize: 1000 * 1000 * 1, // Límite de tamaño de archivo (1 MB)
      },
      fileFilter: imageFileFilter, // Filtro para permitir solo imágenes
    }),
  )
  async  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto) {
    
    

    if (!file) {
      return { message: 'No file uploaded' };
    }
    // Devuelve una respuesta con detalles del archivo cargado
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      dto: createFileDto
    };
  }
}
