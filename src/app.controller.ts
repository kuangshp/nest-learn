import { Controller, Get, Post, Body, Render, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) { }

  @Get()
  async userList(): Promise<any> {
    return await this.appService.userList();
  }

  @Post()
  async createUser(@Body() body: any): Promise<any> {
    return this.appService.createUser(body);
  }

  @Get('user')
  @Render('user')
  async user(@Response() res: any) {
    const user = await this.appService.userList();
    // res.send(user);
    return {
      user,
    }
  }
}
