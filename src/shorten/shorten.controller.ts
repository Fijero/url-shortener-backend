import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ShortenService } from './shorten.service.js';
import * as model from '../model/model.js';
import express from 'express';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Get()
  getUrls(): string[] {
    return this.shortenService.getUrls();
  }

  @Post()
  shortenUrl(@Body() body: model.ReqBody): Promise<any> {
    return this.shortenService.processUrl(body.longUrl);
  }
}
