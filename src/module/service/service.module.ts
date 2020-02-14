import { Module } from '@nestjs/common';
import { UserEntity } from '@src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@src/service/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService
  ]
})
export class ServiceModule { }
