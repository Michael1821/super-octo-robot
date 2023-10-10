import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from '@app/database/schemas/user.schema';
import { Todo, TodoSchema } from '@app/database/schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
