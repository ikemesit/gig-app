import { IsNotEmpty } from 'class-validator';

export class SignupCredentialsDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  middleName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
