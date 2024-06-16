import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}
  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @Post()
  add(@Body() newAnswers) {
    this.answersService.add(newAnswers);
  }
}
