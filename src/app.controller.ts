import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import express from 'express';
import { ShortenService } from './shorten/shorten.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shortenService: ShortenService,
  ) {}

  @Get('all')
  getAllUrl(): Promise<string[]> {
    return this.shortenService.getUrls();
  }

  @Get(':code')
  getLongUrl(@Param('code') code: string, @Res() res: express.Response) {
    return this.appService.getLongUrl(code, res);
  }
}
