import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ShortenModule } from './shorten/shorten.module.js';

@Module({
  imports: [ShortenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
