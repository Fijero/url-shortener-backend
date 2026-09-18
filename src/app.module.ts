import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ShortenModule } from './shorten/shorten.module.js';
import { ConfigModule } from '@nestjs/config';
import { ShortenService } from './shorten/shorten.service.js';

@Module({
  imports: [
    ShortenModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ShortenService],
})
export class AppModule {}
