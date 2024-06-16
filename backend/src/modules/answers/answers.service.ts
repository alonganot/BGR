import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

  findAll() {
    return this.answerModel.find({}).exec();
  }

  async add(answersToAdd) {
    const { answers } = answersToAdd

    try {
      answers.forEach(async answer => {
        const newAnswer = await this.answerModel.create(answer);
        newAnswer.save();
      });
    } catch {
      return 'failed save';
    }
  }
}
