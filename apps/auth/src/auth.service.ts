import { Injectable, UseGuards } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  login(user: UsersDocument, response: Response) {
    const payload = { _id: user._id };
    const accessToken = this.jwtService.sign(payload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_EXPIRE_IN') * 1000,
    });
  }
}
