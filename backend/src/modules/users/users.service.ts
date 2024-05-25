import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async add(userToAdd) {
    try {
      const newUser = await this.userModel.create(userToAdd);
      newUser.save();
    } catch {
      return 'failed save';
    }
  }

  verify(password) {
    return password === 'kshalem2024'
  }

  findAll() {
    return this.userModel.find().exec();
  }
}
