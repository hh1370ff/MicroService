import {
  Inject,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { UsersDocument } from './models/users.schema';
import * as bcrypt from 'bcryptjs';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const hash = await bcrypt.hash(password, 10);

    return this.usersRepository.create({ email, password: hash });
  }

  async verifyUser(email: string, password: string): Promise<UsersDocument> {
    const user = await this.usersRepository.findOne({ email });
    const { password: hashedPassword } = user;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) throw new UnauthorizedException();

    return user;
  }

  async findOne(query: FilterQuery<UsersDocument>) {
    return this.usersRepository.findOne(query);
  }

  async findAll() {
    return this.usersRepository.find({});
  }
}
