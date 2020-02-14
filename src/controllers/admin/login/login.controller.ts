import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { UserService } from '@src/service/user/user.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor (
    private readonly userService: UserService
  ) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<any> {
    return await this.userService.login(body);
  }
}
