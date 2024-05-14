import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/users/prisma-service/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comments.create({ data: createCommentDto });
  }

  findAll() {
    return this.prisma.comments.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.comments.findUnique({
      where: { id },
      include: {
        user: {
          select: { firstName: true, lastName: true, image: true },
        },
      },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comments.update({
      data: updateCommentDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.comments.delete({ where: { id } });
  }
}
