import { Injectable, Logger } from '@nestjs/common';
import { UsersDocument } from './models/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/common';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger = new Logger('UsersRepository');

  constructor(
    @InjectModel(UsersDocument.name)
    usersModel: Model<UsersDocument>,
  ) {
    super(usersModel);
  }
}
