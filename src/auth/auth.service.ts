import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) {}

  signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    return this.accountRepository.signUp(signupCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.accountRepository.validateUser(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
