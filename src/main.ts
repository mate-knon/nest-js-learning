import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MyLogger } from './logger/services/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  // Customizable logger
  app.useLogger(new MyLogger());
  // app.use(functionalLogger); - It can be registered here to every routes
  // The customized version of it could be used as well (validation.pipe.ts)
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
