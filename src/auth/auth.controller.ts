import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { PublicKeyGuard } from './guards/public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('get-users')
  getUsers() {
    return this.authService.getUsers()
  }
  @UseGuards(PublicKeyGuard)
  @Post('login')
  login(@Body() loginDto:LoginDto) {
    return this.authService.logIn(loginDto)
  }

  @UseGuards(PublicKeyGuard)
  @Post('sign-up')
  signup(@Body() createUserDto: CreateUserDto){
    return this.authService.createUser(createUserDto)
  }
  @UseGuards(PublicKeyGuard)
  @UseGuards(AuthGuard)
  @Patch('update-user')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(updateUserDto);
  }

 
}
