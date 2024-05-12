import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export interface Option {
  url: string;
  type: 'image' | 'icon';
}

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ collection: 'questions' })
export class Question {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: number;

  @Prop()
  number: number;

  @Prop({ type: Array })
  Options: Option[];

  @Prop()
  correctIndex: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
