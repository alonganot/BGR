import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import { Question } from './question.entity';

export type AnswerDocument = HydratedDocument<Answer>;

const getIsraelTime = () => {
  const currentTime = new Date();
  const israelOffset = 3 * 60 * 60 * 1000; // Israel is UTC+3
  const utcTime = currentTime.getTime();

  return new Date(utcTime + israelOffset);
}

@Schema({ collection: 'answers' })
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Question })
  questionId: Question;

  @Prop()
  selectedAnswer: number;

  @Prop()
  type: string;

  @Prop()
  wasCorrect: boolean;

  @Prop()
  secondsTaken: number;

  @Prop({ type: Date, default: () => getIsraelTime() })
  createdAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
