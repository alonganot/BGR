import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import { Question } from './question.entity';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({ collection: 'answers' })
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Question })
  questionId: Question;

  @Prop()
  selectedAnswer: 0 | 1 | 2 | 3;

  @Prop()
  type: string;

  @Prop()
  wasCorrect: boolean;

  @Prop()
  secondsTaken: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
