import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import './config/redis.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(['http://localhost:5173/']);
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
