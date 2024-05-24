import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    QuestionsModule,
    AnswersModule,
    MongooseModule.forRoot('mongodb+srv://alonga:password12321@alonga.zyoscl0.mongodb.net/BGR'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
