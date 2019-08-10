import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    return await query.getMany();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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
    newUser.firstName = firstName;
    newUser.middleName = middleName;
    newUser.lastName = lastName;
    newUser.dob = dob;
    newUser.address = address;
    newUser.email = email;
    newUser.phone = phone;

    await newUser.save();

    return newUser;
  }
}
