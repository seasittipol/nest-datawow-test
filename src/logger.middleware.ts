import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users/users.service';
import { RequestWithUser } from './types/type';
const jwt = require('jsonwebtoken');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    console.log('Request...');
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new Error('invalid authorization header');
    }
    const token = authorization.split(' ')[1];
    const decodePayload = jwt.verify(token, process.env.SECRETKEY);
    const user = await this.usersService.findOneWithUsername(
      decodePayload.username,
    );
    if (!user) {
      throw new Error('not found this user');
    }
    delete user.password;
    req.user = user;
    next();
  }
}
