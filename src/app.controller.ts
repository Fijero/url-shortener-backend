import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import express from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  getLongUrl(@Param('code') code: string, @Res() res: express.Response) {
    return this.appService.getLongUrl(code, res);
  }
}
