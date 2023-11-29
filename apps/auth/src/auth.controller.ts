import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@CurrentUser() user: UsersDocument, @Res() response: Response) {
    this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @MessagePattern('authentication')
  getUser(@CurrentUser() user: UsersDocument) {
    return user;
  }
}
