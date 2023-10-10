import { IsMongoId } from 'class-validator';

export class DeleteTodoDto {
  @IsMongoId()
  id: string;
}
