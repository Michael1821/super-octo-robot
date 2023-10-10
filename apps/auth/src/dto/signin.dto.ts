import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';

export class SigninDto {
  @IsMongoId()
  id: string;

  @IsString()
  @MaxLength(128)
  @MinLength(4)
  password: string;
}
