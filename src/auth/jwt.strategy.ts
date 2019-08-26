import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Account)
    private accountRepository: AccountRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Secret098765',
    });
  }

  async validate(payload: JwtPayload): Promise<Account> {
    const { username } = payload;
    const account = await this.accountRepository.findOne({ username });

    if (!account) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
