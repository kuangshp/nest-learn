<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<h3 align="center">一步一步教你搭建一个nestjs-mysql-api项目</h3>





## 一、使用官方脚手架及构建一个项目

* 1、[官网地址](https://docs.nestjs.com/cli/overview)

* 2、使用脚手架构建一个初始项目

* 3、查看常见的命令

  ```shell
  ➜  nest-learn git:(master) ✗ nest   
  Usage: nest <command> [options]
  
  Options:
    -v, --version                                   Output the current version.
    -h, --help                                      Output usage information.
  
  Commands:
    new|n [options] [name]                          Generate Nest application.
    build [options] [app]                           Build Nest application.
    start [options] [app]                           Run Nest application.
    generate|g [options] <schematic> [name] [path]  Generate a Nest element.
      Available schematics:
        ┌───────────────┬─────────────┐
        │ name          │ alias       │
        │ application   │ application │
        │ angular-app   │ ng-app      │
        │ class         │ cl          │
        │ configuration │ config      │
        │ controller    │ co          │
        │ decorator     │ d           │
        │ filter        │ f           │
        │ gateway       │ ga          │
        │ guard         │ gu          │
        │ interceptor   │ in          │
        │ interface     │ interface   │
        │ middleware    │ mi          │
        │ module        │ mo          │
        │ pipe          │ pi          │
        │ provider      │ pr          │
        │ resolver      │ r           │
        │ service       │ s           │
        │ library       │ lib         │
        │ sub-app       │ app         │
        └───────────────┴─────────────┘
    info|i                                          Display Nest project details.
    update|u [options]                              Update Nest dependencies.
    add [options] <library>                         Adds support for an external library to your project.
  ➜  nest-learn git:(master) ✗ 
  ```

* 4、直接启动项目

* 5、我们今天要实现的功能

* ![image-20200214090051371](README.assets/image-20200214090051371.png)![](README.assets/image-20200214090138472.png)

## 二、对项目的基本配置

* 1、**使用`.env`文件存放敏感信息或者配置信息**

  * 安装依赖包

    ```shell
    npm install dotenv
    npm install @types/dotenv -D
    ```

  * 项目下创建.env的文件

  * 在`main.ts`中使用

    ```typescript
    import 'dotenv/config';
    import { NestFactory } from '@nestjs/core';
    import { Logger } from '@nestjs/common';
    
    import { AppModule } from './app.module';
    
    const PORT = process.env.PORT || 8080;
    const PREFIX = process.env.PREFIX || '/';
    
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
    
      // 给请求添加prefix
      app.setGlobalPrefix(PREFIX);
      await app.listen(PORT, () => {
        Logger.log(`服务已经启动,请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
      });
    }
    bootstrap().catch(e => Logger.error(e));
    ```

* 2、使用`nest-config` 配置

  * 安装依赖包

    ```shell
    npm install nestjs-config
    ```

  * 项目根目录下创建一个`config`的目录

  * 直接在`app.module.ts`中引入配置

    ```shell
    import * as path from 'path';
    
    import { Module } from '@nestjs/common';
    import { ConfigModule } from 'nestjs-config';
    
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
          modifyConfigName: (name: string) => name.replace('.config', ''),
        }), // 配置加载配置文件
        ConfigModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule { }
    ```

* 3、配置引包别名(`tsconfig.json`文件中)

  ```shell
  // 配置引包的别名
  "paths": {
    "@src/*": [
    	"src/*"
  	]
  }
  ```

## 三、配置`mysql`

* 1、[官网地址](https://docs.nestjs.com/recipes/sql-typeorm)

* 2、安装的依赖包

  ```shell
  npm install --save @nestjs/typeorm typeorm mysql
  ```

* 3、在`.env`文件中配置数据库的基本配置

  ```shell
  // mysql数据库配置
  DB_TYPE = mysql
  DB_HOST = localhost
  DB_USERNAME = root
  DB_PASSWORD = root
  DB_DATABASE = test
  DB_PORT = 3306
  DB_SYNCHRONIZE = false
  DB_LOGGING = true
  ```

* 4、在`config`文件夹下创建一个`database.config.ts`文件

  ```typescript
  export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dropSchema: false,
    synchronize: false,
    logging: false,
  };
  ```

* 5、在`app.module.ts`的文件中配置

  ```typescript
  import { ConfigModule, ConfigService } from 'nestjs-config';
  import { TypeOrmModule } from '@nestjs/typeorm';
  
  @Module({
    imports: [
      ...
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
      ....
    ],
    ...
  })
  export class AppModule { }
  ```

* 6、安装一个工具使数据库文件自动生成`entity`的文件

  ```shell
  npm install typeorm-model-generator-cli 
  ```

* 7、配置命令

  ```json
  "scripts": {
    ...
    "db": "typeormCli init"
  },
  ```

* 8、创建一个数据库及数据表

  ```sql
  CREATE TABLE `user` (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '主键id',
    `uuid` varchar(50) not null COMMENT 'uuid主键',
    `username` varchar(50) NOT NULL COMMENT '用户名',
    `password` varchar(100) NOT NULL COMMENT '用户密码',
    `mobile` varchar(11) DEFAULT NULL COMMENT '用户手机号码',
    `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
    `status` tinyint(4) DEFAULT '1' COMMENT '用户状态',
    `platform` varchar(50) DEFAULT NULL  COMMENT '平台',
    `is_super` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否为超级管理员',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY `user_mobile_email` (`username`, `mobile`, `email`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
  ```

* 9、运行命令生成实体类

  ![image-20200214092433260](README.assets/image-20200214092433260.png)

* 10、直接在`app.controller.ts`文件中写入测试代码

  ```typescript
  import { Controller, Get, Post, Body } from '@nestjs/common';
  import { AppService } from './app.service';
  
  @Controller()
  export class AppController {
    constructor (private readonly appService: AppService) { }
  
    @Get()
    async userList(): Promise<any> {
      return this.appService.userList();
    }
  
    @Post()
    async createUser(@Body() body: any): Promise<any> {
      return this.appService.createUser(body);
    }
  }
  ```

* 11、在`app.service.ts`文件中写入代码

  ```typescript
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { UserEntity } from './entities/user.entity';
  
  @Injectable()
  export class AppService {
    constructor (
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>
    ) { }
  
    async userList(): Promise<any> {
      return this.userRepository.find();
    }
  
    async createUser(data: any): Promise<any> {
      const user = await this.userRepository.create(data);
      return await this.userRepository.save(user);
    }
  }
  ```

* 12、在`app.module.ts`中引入实体类

  ```typescript
  imports: [
    ...
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  ...
  ```

* 13、运行项目

  ![image-20200214094844158](README.assets/image-20200214094844158.png)

* 14、**<font color="#f00">注意点</font>**

  在之前的版本中是不会出现这个问题，后来版本升级就出现了这个问题,如果你是使用的`mongodb`也不会出现这个问题,解决这个`bug`的方法

  * 1、拷贝之前版本中的两个文件到项目中，使用`nodemon`启动

  * 2、修改启动命令

    ```json
    "start:dev": "nodemon",
    ```

* 15、使用`postman`测试数据

