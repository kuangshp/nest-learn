import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { UserService } from '@src/service/user/user.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserRep } from '../user/dto/user.rep.dto';

@ApiTags('用户登录')
@Controller('login')
export class LoginController {
  constructor (
    private readonly userService: UserService
  ) { }

  @ApiOperation({
    summary: '用户登录',
    description: '用户名可以是手机号码、邮箱、用户名',
  })
  @ApiCreatedResponse({
    type: LoginDto,
    description: '用户登录DTO'
  })
  @ApiOkResponse({ type: UserRep })
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<any> {
    return await this.userService.login(body);
  }
}
