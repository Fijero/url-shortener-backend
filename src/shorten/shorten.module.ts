import { Module } from '@nestjs/common';
import { ShortenService } from './shorten.service.js';
import { ShortenController } from './shorten.controller.js';

@Module({
    providers: [ShortenService],
    controllers: [ShortenController]
    
})
export class ShortenModule {}
