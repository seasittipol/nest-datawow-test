import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma-service/prisma.service';

@Module({
  imports: [UsersModule, PostsModule, CommentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('auth/me');
  }
}
