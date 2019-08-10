import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No update data provided');
    }

    for (const key of Object.keys(data)) {
      user[key] = data[key];
    }

    await user.save();

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('User does not exist');
    }
  }
}
