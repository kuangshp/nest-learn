import 'dotenv/config';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import adminConfig from './config/admin.config';

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: adminConfig.staticPrefixPath,
  });

  //配置模板引擎及模板的目录
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
  });
}
bootstrap().catch(e => Logger.error(e));
