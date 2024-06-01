import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: string) {
    return `This action returns a #${id} question`;
  }

  update(id: string, updateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: string) {
    const questionToRemove = await this.questionModel.findById(id);
    if (!questionToRemove) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    const questionNumber = questionToRemove.number;

    await this.questionModel.deleteOne({ _id: id }).exec();

    await this.questionModel.updateMany(
      { number: { $gt: questionNumber } },
      { $inc: { number: -1 } }
    ).exec();

    return `Question #${id} successfully removed and remaining questions renumbered`;
  }

  async updateUrl(id: string, index: number, url: string) {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    if (!question.options[index]) {
      throw new NotFoundException(`Option at index ${index} not found for question with ID ${id}`);
    }

    question.options[index].url = url;
    question.markModified('options');

    await question.save();

    return question;
  }
}
