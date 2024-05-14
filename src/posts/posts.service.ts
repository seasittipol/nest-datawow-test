import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/users/prisma-service/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({ data: createPostDto });
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.posts.update({ data: updatePostDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.posts.delete({ where: { id } });
  }
}
