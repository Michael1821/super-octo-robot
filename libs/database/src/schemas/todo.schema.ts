import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '@app/database/schemas/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Todo {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
