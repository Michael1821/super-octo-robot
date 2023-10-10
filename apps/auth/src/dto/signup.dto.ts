import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MaxLength(128)
  @MinLength(4)
  password: string;
}
