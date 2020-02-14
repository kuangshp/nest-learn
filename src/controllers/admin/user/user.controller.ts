import { Controller, Get, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';

import adminConfig from '@src/config/admin.config';
import { UserService } from '@src/service/user/user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { UserRep } from './dto/user.rep.dto';

@Controller(`${adminConfig.adminPath}/user`)
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) { }


  /**
   * @Author: 水痕
   * @Date: 2020-02-14 10:58:41
   * @LastEditors: 水痕
   * @Description: 分页获取用户数据
   * @param {type} 
   * @return: 
   */
  @Get()
  async userList(): Promise<any> {
    return await this.userService.findPage();
  }

  /**
   * @Author: 水痕
   * @Date: 2020-02-14 11:06:40
   * @LastEditors: 水痕
   * @Description: 创建数据
   * @param {type} 
   * @return: 
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: UserCreateDto): Promise<UserRep> {
    const user = await this.userService.createUser(body);
    return user.toResponseObject(false);
  }
}
