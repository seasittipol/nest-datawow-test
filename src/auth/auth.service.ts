import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(data: CreateUserDto) {
    return this.usersService.create(data);
  }

  async login(username: string) {
    return this.usersService.findOneWithUsername(username);
  }
}
