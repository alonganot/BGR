import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
    } catch(error) {
      throw new HttpException(error, 500);
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

  async updateOptionType(id: string, index: number, type: string) {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    if (!question.options[index]) {
      throw new NotFoundException(`Option at index ${index} not found for question with ID ${id}`);
    }

    if (type === 'image' || type === 'icon') {
      question.options[index].type = type;
      question.markModified('options');
      await question.save();
    } else {
      throw new NotFoundException(`Option type invalid`);
    }

    return question;
  }

  async updateTitle(id: string, title: string) {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    question.title = title;
    await question.save();

    return question;
  }

  async updateCorrectIndex(id: string, correctIndex: number) {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    question.correctIndex = correctIndex;
    await question.save();

    return question;
  }

  async swap(firstNum: number, secondNum: number) {
    const firstQuestion = await this.questionModel.findOne({ number: firstNum });
    const secondQuestion = await this.questionModel.findOne({ number: secondNum });

    if (!firstQuestion) {
      throw new NotFoundException(`Question with number ${firstNum} not found`);
    }

    if (!secondQuestion) {
      throw new NotFoundException(`Question with number ${secondNum} not found`);
    }

    firstQuestion.number = secondNum;
    await firstQuestion.save();

    secondQuestion.number = firstNum;
    await secondQuestion.save();
  }
}
