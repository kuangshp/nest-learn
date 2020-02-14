import {
  IsOptional,
  IsEnum,
  IsMobilePhone,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {
  @IsOptional()
  readonly email?: string;

  @IsMobilePhone('zh-CN', { message: '手机号码格式错误' })
  @IsOptional()
  readonly mobile?: string;

  @IsEnum({ 禁用: 0, 当前可用: 1 }, { message: '必须是0或者1' })
  @IsNumber()
  @Transform(value => parseInt(value, 10))
  @IsOptional()
  readonly status?: number;

  @IsOptional()
  readonly platform?: string;

  @IsEnum({ 普通用户: 0, 超级管理员: 1 }, { message: '必须是0或者1' })
  @IsNumber()
  @Transform(value => parseInt(value, 10))
  @IsOptional()
  readonly is_super?: number;
}
