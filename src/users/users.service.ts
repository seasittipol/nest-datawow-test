import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({ data: updateUserDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }

  findOneWithUsername(username: string) {
    return this.prisma.users.findUnique({ where: { username } });
  }

  findOneWithEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
