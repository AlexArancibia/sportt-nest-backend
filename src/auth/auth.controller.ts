import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('get-users')
  getUsers() {
    return this.authService.getUsers()
  }

  @Post('login')
  login(@Body() loginDto:LoginDto) {
    return this.authService.logIn(loginDto)
  }


  @Post('sign-up')
  signup(@Body() createUserDto: CreateUserDto){
    return this.authService.createUser(createUserDto)
  }
  
  @UseGuards(AuthGuard)
  @Patch('update-user')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(updateUserDto);
  }

 
}
