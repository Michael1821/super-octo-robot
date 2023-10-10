import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(4096)
  description: string;
}
