import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { Todo } from '@app/database/schemas/todo.schema';
import { HttpErrors, UserDataDto } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async getTodos(user: UserDataDto) {
    return this.todoModel
      .find(
        {
          owner: user.id,
        },
        { __v: 0 },
      )
      .exec();
  }

  async createTodo(user: UserDataDto, dto: CreateTodoDto) {
    const todo = new this.todoModel({
      ...dto,
      owner: user.id,
    });
    await todo.save();
    return {
      id: todo._id,
    };
  }

  async deleteTodo(user: UserDataDto, dto: DeleteTodoDto) {
    const deleted = await this.todoModel
      .findOneAndDelete({
        owner: user.id,
        _id: dto.id,
      })
      .exec();
    console.log(deleted);
    if (!deleted)
      throw new ForbiddenException({
        error_message: HttpErrors.OWNERSHIP_ERROR,
      });

    return { id: deleted._id };
  }
}
