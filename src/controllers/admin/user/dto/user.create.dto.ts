import { UserDto } from './user.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDto extends UserDto {
  @IsString({ message: '用户名必须为字符类型' })
  @IsNotEmpty({ message: '姓名不能为空' })
  readonly username: string;

  @IsString({ message: '密码必须为字符串类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}