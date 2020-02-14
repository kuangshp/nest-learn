import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '@src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../base/base.service';
import { UserCreateDto } from '@src/controllers/admin/user/dto/user.create.dto';
import { LoginDto } from '@src/controllers/admin/login/dto/login.dto';
import { ToolsService } from '../tools/tools.service';

@Injectable()
export class UserService extends BaseService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly toolsService: ToolsService,
  ) {
    super(userRepository);
  }

  async createUser(data: UserCreateDto): Promise<any> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async login(data: LoginDto): Promise<any> {
    const { username, password } = data;
    let user: any;
    if (this.validator.isMobilePhone(username, 'zh-CN')) {
      user = await this.userRepository.findOne({ where: { mobile: username } });
    } else if (this.validator.isEmail(username)) {
      user = await this.userRepository.findOne({ where: { email: username } });
    } else {
      user = await this.userRepository.findOne({ where: { username } });
    }
    if (user && this.toolsService.checkPassword(password, user.password)) {
      return user.toResponseObject();
    } else {
      throw new HttpException('请检查你的用户名与密码', HttpStatus.OK);
    }
  }
}
