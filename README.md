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

## 二、对项目的基本配置

* 1、