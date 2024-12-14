import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  // Importa PrismaService
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo cliente
  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  // Obtener todos los clientes
  async findAll() {
    return this.prisma.customer.findMany();
  }

  // Obtener un cliente por ID
  async findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  // Actualizar un cliente
  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  // Eliminar un cliente
  async remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
