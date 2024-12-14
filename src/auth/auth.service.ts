import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, encrypt } from '../../lib/bcrypt';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // Obtener todos los usuarios
  async getUsers() {
    const users = await this.prisma.user.findMany();

    // Eliminamos la contraseña antes de devolver los usuarios
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }


  // Login de usuario
  async logIn(loginDto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: loginDto.email,
        },
      });

      if (!user) {
        throw new BadRequestException('Email o contraseña inválidos.');
      }

      const isPasswordMatch = await compare(loginDto.password, user.password);
      if (!isPasswordMatch) {
        throw new BadRequestException('Email o contraseña inválidos.');
      }

      // Excluimos la contraseña de la respuesta
      const { password, ...userWithoutPassword } = user;

      // Generamos el JWT para el login
      const access_token = await this.jwtService.signAsync(userWithoutPassword);
      return { access_token, userInfo: userWithoutPassword };
    } catch (error) {
      throw new InternalServerErrorException('Error al hacer login');
    }
  }
  // Crear un usuario
  async createUser(createUserDto: CreateUserDto) {
    try {
      const userFound = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (userFound) {
        throw new BadRequestException('El usuario ya existe');
      }

      const hashedPassword = await encrypt(createUserDto.password);

      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          role: createUserDto.role,
        },
      });

      // Excluimos la contraseña de la respuesta
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword; // Solo devolvemos los datos del usuario, sin el token
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  // Actualizar un usuario
  async updateUser(updateUserDto: UpdateUserDto) {
    try {
      console.log('Updating user with email:', updateUserDto.email);

      const { email, password, newPassword, ...otherData } = updateUserDto;

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        console.log('User not found');
        throw new NotFoundException('Usuario no encontrado');
      }

      let hashedPassword = user.password;

      // Si se proporciona una nueva contraseña, verificamos la actual
      if (password && newPassword) {
        console.log('Current password:', password);
        console.log('New password:', newPassword);

        const isPasswordMatch = await compare(password, user.password);
        console.log('Password match:', isPasswordMatch);

        if (!isPasswordMatch) {
          console.log('The current password is incorrect');
          throw new BadRequestException('La contraseña actual es incorrecta');
        }

        hashedPassword = await encrypt(newPassword); // Ciframos la nueva contraseña
        console.log('New hashed password:', hashedPassword);
      }

      // Actualizamos los datos del usuario
      const updatedUser = await this.prisma.user.update({
        where: { email },
        data: {
          firstName: otherData.firstName || user.firstName,
          lastName: otherData.lastName || user.lastName,
          email: email || user.email,
          password: hashedPassword, // Solo se actualiza si es necesario
          role: otherData.role || user.role,
        },
      });

      const { password: _, ...userWithoutPassword } = updatedUser;

      // Generar un nuevo JWT
      const access_token = await this.jwtService.signAsync(userWithoutPassword);
      console.log('User updated. Generated new access token:', access_token);

      return { access_token, userInfo: userWithoutPassword };
    } catch (error) {
      console.error('Error during user update:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }
}
