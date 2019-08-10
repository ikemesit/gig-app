import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  dob: string;

  @IsOptional()
  email: string;

  @IsOptional()
  address: string;

  @IsOptional()
  phone: string;
}
