import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './controllers/admin/admin.module';
import { FrontModule } from './controllers/front/front.module';
import { ApiModule } from './controllers/api/api.module';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { HttpErrorFilter } from './filters/http-error.filter';
import { ValidationPipe } from './pipe/validation.pipe';
import { TransformInterceptor } from './interfaces/transform/transform.interceptor';
import { AuthGuard } from './guard/auth.guard';


@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: (name: string) => name.replace('.config', ''),
    }), // 配置加载配置文件
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: ['./**/*.entity.ts', './**/*.entity.js'],
        synchronize: config.get('database.synchronize'),
        logging: config.get('database.logging'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    AdminModule,
    FrontModule,
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
