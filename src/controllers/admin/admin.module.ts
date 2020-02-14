import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ServiceModule } from '@src/module/service/service.module';
import { LoginController } from './login/login.controller';

@Module({
  imports: [
    ServiceModule,
  ],
  controllers: [UserController, LoginController]
})
export class AdminModule { }
