import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(createUser: CreateUserDto) {
    await this.validateCreateUserDto(createUser);
    return this.usersRepository.create({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
    });
  }

  private async validateCreateUserDto(createUser: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUser.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exist!');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
