import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid/v1';

@Injectable()
export class UsersService {
  private userStore: User[] = [];

  getAllUsers(): User[] {
    return this.userStore;
  }

  getUserById(id: string): User {
    return this.userStore.find(user => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const {
      firstName,
      lastName,
      middleName,
      email,
      address,
      dob,
      phone,
    } = createUserDto;

    const newUser = new User();
    newUser.id = uuid();
    newUser.firstName = firstName;
    newUser.middleName = middleName;
    newUser.lastName = lastName;
    newUser.dob = dob;
    newUser.address = address;
    newUser.email = email;
    newUser.phone = phone;

    this.userStore.push(newUser);

    return newUser;
  }

  updateUser(id: string, data: UpdateUserDto): User {
    const found = this.getUserById(id);

    if (!found) {
      throw new NotFoundException('User does not exist');
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No update data provided');
    }

    for (const key of Object.keys(data)) {
      found[key] = data[key];
    }

    return found;
  }

  deleteUser(id: string): void {
    const found = this.getUserById(id);
    const indx = this.userStore.indexOf(found);
    this.userStore.splice(indx, 1);
  }
}
