import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { AUTH_MICROSERVICE } from '../constants/constants';
import { ClientProxy } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(@Inject(AUTH_MICROSERVICE) private client: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.cookie?.split('=')[1];
    if (!jwt) return false;

    return this.client.send('authentication', { Authentication: jwt }).pipe(
      tap((user) => (request.user = user)),
      map(() => true),
    );
  }
}
