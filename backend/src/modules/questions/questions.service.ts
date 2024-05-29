import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) { };

  async create(questionToAdd) {
    try {
      const { question } = questionToAdd

      const questionsLength = await this.questionModel.countDocuments({})
      delete question._id

      const finalQuestion: Question = { ...question, number: questionsLength + 1 }

      const newQuestion = await this.questionModel.create(finalQuestion);
      newQuestion.save();
    } catch {
      return 'failed save';
    }
  }

  findAll() {
    return this.questionModel.find({}).exec();
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
