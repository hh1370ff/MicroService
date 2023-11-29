import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './models/users.schema';
import { UsersRepository } from './users.repository';
import { JwtStrategy } from '../strategy/jtw-stratgy';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UsersDocument.name, schema: UsersSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
