import { Controller, Get, Post, Body, HttpStatus, HttpException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  add(@Body() newUser) {
    this.usersService.add(newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body) {
    if (this.usersService.verify(body.password)) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
      };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
