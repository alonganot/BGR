import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export interface Frame {
  name: string;
  organization: string;
  city: string;
}

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: number;

  @Prop()
  age: number;

  @Prop()
  gender: 'male' | 'female';

  @Prop()
  canRead: 'yes' | 'no' | 'some';

  @Prop({ type: Object })
  frame: Frame;
}

export const UserSchema = SchemaFactory.createForClass(User);
