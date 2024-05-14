import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({ data: createPostDto });
  }

  findAll() {
    return this.prisma.posts.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
        _count: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
        _count: true,
        Comments: {
          select: {
            description: true,
            updatedAt: true,
            user: { select: { firstName: true, lastName: true, image: true } },
          },
        },
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.posts.update({ data: updatePostDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.posts.delete({ where: { id } });
  }
}
