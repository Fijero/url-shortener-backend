import { Injectable, Header, Res } from '@nestjs/common';
import express from 'express';
import { redisClient } from './config/redis.js';

@Injectable()
export class AppService {
  async getLongUrl(uniqueKey: string, res: express.Response) {
    try {
      // now get the code from the param and redirect to the initial long url

      const keyCheck = await redisClient.get(`URL:${uniqueKey}`);

      if (!keyCheck) {
        return res.sendStatus(404);
      } else {
        return res.redirect(`${keyCheck}`);
      }
    } catch (error: any) {
      throw error;
    }
  }
}
