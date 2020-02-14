import { Injectable } from '@nestjs/common';
import { UserEntity } from '@src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(data: any): Promise<any> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
