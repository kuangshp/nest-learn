import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) { }

  @Get()
  async userList(): Promise<any> {
    return this.appService.userList();
  }

  @Post()
  async createUser(@Body() body: any): Promise<any> {
    return this.appService.createUser(body);
  }
}
