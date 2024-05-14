import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.login(body.username);
    if (!user) {
      throw new UnauthorizedException({ message: 'wrong username' });
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException({ message: 'wrong password' });
    }
    const { password, ...payload } = body;
    const accessToken = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    delete user.password;
    return { accessToken, user };
  }
}
