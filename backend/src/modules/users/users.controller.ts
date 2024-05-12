import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  add(@Body() newUser) {
    this.usersService.add(newUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
