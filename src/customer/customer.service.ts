import { Injectable, ConflictException, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import * as bcrypt from 'bcrypt';
import { encrypt } from 'lib/bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email: createCustomerDto.email },
    });

    if (existingCustomer) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await encrypt(createCustomerDto.password);

    const customer = await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        password: hashedPassword,
      },
    });

    const { password, ...result } = customer;
    return result;
  }

  async login(loginCustomerDto: LoginCustomerDto) {

    try {
    const customer = await this.prisma.customer.findUnique({
      where: { email: loginCustomerDto.email },
    });

    if (!customer) {
      throw new UnauthorizedException('Email o contraseña inválidos.');
    }

    const isPasswordMatch = await bcrypt.compare(loginCustomerDto.password, customer.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...customerWithoutPassword } = customer;
    const access_token = await this.jwtService.signAsync(customerWithoutPassword);
    return { access_token, userInfo: customerWithoutPassword };
  } catch(error){
      throw new InternalServerErrorException('Error al hacer login');
  }

  }

  async findAll() {
    return this.prisma.customer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    if (updateCustomerDto.password) {
      updateCustomerDto.password = await bcrypt.hash(updateCustomerDto.password, 10);
    }

    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          address: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return updatedCustomer;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      throw error;
    }
  }
}