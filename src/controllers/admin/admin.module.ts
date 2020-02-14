import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ServiceModule } from '@src/module/service/service.module';

@Module({
  imports: [
    ServiceModule,
  ],
  controllers: [UserController]
})
export class AdminModule { }
