import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Post()
  create(@Body() newQuestion) {
    return this.questionsService.create(newQuestion);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Patch(':id/index/:index/url')
  updateUrl(
    @Param('id') id: string,
    @Param('index') index: string,
    @Body('url') url: string,
  ) {
    return this.questionsService.updateUrl(id, +index, url);
  }

  @Patch(':id/index/:index/type/:type')
  updateOptionType(
    @Param('id') id: string,
    @Param('index') index: string,
    @Param('type') type: string,
  ) {
    return this.questionsService.updateOptionType(id, +index, type);
  }

  @Patch(':id/title')
  updateTitle(
    @Param('id') id: string,
    @Body('title') title: string,
  ) {
    return this.questionsService.updateTitle(id, title);
  }

  @Patch('number/:firstNum/:secondNum')
  swapQuestionNumbers(
    @Param('firstNum') firstNum: number,
    @Param('secondNum') secondNum: number,
  ) {
    this.questionsService.swap(firstNum, secondNum);
  }

  @Patch(':id/correctIndex/:correctIndex')
  updateCorrectIndex(
    @Param('id') id: string,
    @Param('correctIndex') correctIndex: number,
  ) {
    return this.questionsService.updateCorrectIndex(id, correctIndex);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
