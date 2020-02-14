import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async userList(): Promise<any> {
    return this.userRepository.find();
  }

  async createUser(data: any): Promise<any> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
