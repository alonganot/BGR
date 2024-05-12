import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private userModel: Model<Question>) {};

  create(createQuestionDto) {
    return 'This action adds a new question';
  }

  findAll() {
    return this.userModel.find({}).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
