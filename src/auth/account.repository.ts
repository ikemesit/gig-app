import { Repository, EntityRepository } from 'typeorm';
import { Account } from './account.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const account = new Account();
    account.username = username;
    account.password = password;

    await account.save();
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username, password });

    if (user) {
      return user.username;
    } else {
      return null;
    }
  }
}
