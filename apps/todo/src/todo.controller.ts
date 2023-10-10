import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';
import { DeleteTodoDto } from './dto/delete-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('get')
  @UseGuards(JwtAuthGuard)
  getTodos(@Req() req) {
    return this.todoService.getTodos(req.user);
  }
  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  createTodo(@Req() req, @Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(req.user, dto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  signIn(@Req() req, @Body() dto: DeleteTodoDto) {
    return this.todoService.deleteTodo(req.user, dto);
  }
}
