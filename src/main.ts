import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });
  //app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.disable('x-powered-by');
  app.setGlobalPrefix('apiv1');
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
