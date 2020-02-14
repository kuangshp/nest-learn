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

* 4、在