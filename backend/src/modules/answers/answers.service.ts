import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) { }

  async findAll() {
    const answers = await this.answerModel.find({}).populate('userId').populate('questionId').exec();
    let combined = []
    
    answers.forEach((obj: any) => {
      const userId = obj.userId._id;

      if (!combined[userId]) {
        combined[userId] = {
          user: obj.userId,
          answers: []
        };
      }

      const answer = {
        _id: obj._id,
        question: obj.questionId,
        type: obj.type,
        selectedAnswer: obj.selectedAnswer,
        wasCorrect: obj.wasCorrect,
        secondsTaken: obj.secondsTaken,
        createdAt: obj.createdAt
      };

      combined[userId].answers.push(answer);
    });

    return Object.values(combined);
  }

  async add(answersToAdd) {
    const { answers } = answersToAdd

    try {
      answers.forEach(async answer => {
        const newAnswer = await this.answerModel.create(answer);
        newAnswer.save();
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
