import { Module } from '@nestjs/common';
import { UserEntity } from '@src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@src/service/user/user.service';
import { ToolsService } from '@src/service/tools/tools.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  providers: [
    UserService,
    ToolsService,
  ],
  exports: [
    UserService,
    ToolsService
  ]
})
export class ServiceModule { }
