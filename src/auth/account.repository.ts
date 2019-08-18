import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Account } from './account.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from '../users/user.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    const {
      firstName,
      lastName,
      email,
      middleName,
      dob,
      phone,
      address,
    } = signupCredentialsDto;
    const user = new User();
    user.firstName = firstName;
    user.middleName = middleName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.dob = dob;
    user.address = address;

    const { username, password } = signupCredentialsDto;
    const account = new Account();
    account.username = username;
    account.salt = await bcrypt.genSalt();
    account.password = await this.hashPassword(password, account.salt);
    account.user = user;

    try {
      await account.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException('Something strange happened');
      }
    }
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const account = await this.findOne({ username });

    if (account && account.validatePassword(password)) {
      return account.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
