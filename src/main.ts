import 'dotenv/config';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import adminConfig from './config/admin.config';

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 设置跨站访问
    logger: false,
  });
  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);

  // 配置api文档信息
  const options = new DocumentBuilder()
    .setTitle('nestjs api文档')
    .setDescription('nestjs api接口文档')
    .setBasePath(PREFIX)
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  // 访问频率限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 100, // 限制15分钟内最多只能访问100次
    }),
  );
  // Web漏洞的
  app.use(helmet());

  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: adminConfig.staticPrefixPath,
  });

  //配置模板引擎及模板的目录
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
  });
}
bootstrap().catch(e => Logger.error(e));
