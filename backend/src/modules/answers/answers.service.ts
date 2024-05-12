import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private userModel: Model<Answer>) {}

  findAll() {
    return this.userModel.find({}).exec();
  }
}
