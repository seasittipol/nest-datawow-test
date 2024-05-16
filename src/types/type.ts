import { Request } from 'express';

export interface incomingUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestWithUser extends Request {
  user?: incomingUser;
}
