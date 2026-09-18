import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { redisClient } from '../config/redis.js';

@Injectable()
export class ShortenService {
  getUrls(): string[] {
    return [];
  }

  async processUrl(url: string): Promise<any> {
    try {
      //   confirm its a valid link
      const validUrl = url.startsWith('https://');

      if (!validUrl) {
        throw new BadRequestException('INVALID URL');
      }

      // check if the long url has been saved already and return the key.
      // first get all the keys and loop through to check if the link alrready exists and return tyhe shhort url
      const redisKeys = await redisClient.keys('URL:*');
      let validKeysAndValues: urlKeyVal[] = [];
      let uniqueKey: string = 'h';

      await Promise.all(
        redisKeys.map(async (ctx) => {
          const key = ctx.split('URL:')[1];
          const value = await redisClient.get(`URL:${key}`);

          validKeysAndValues.push({ key, value });
        }),
      );

      const existUrl = validKeysAndValues.find((e, _, __) => {
        if (e.value === url) {
          return e;
        } else {
          return null;
        }
      });

      if (existUrl != null || undefined) {
        uniqueKey = existUrl?.key ?? '';
      } else {
        // here set a unique short key for the long url provided
        uniqueKey = generateRandom();
        const longUrl = url;

        const setUrl = await redisClient.set(`URL:${uniqueKey}`, longUrl);

        if (!setUrl) {
          throw new Error('failed to shorten URL');
        }
      }

      return `https://short-url-api.fijero.dev/${uniqueKey}`;
    } catch (error) {
      throw error;
    }
  }
}

function generateRandom(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

function getKeyByValue(): string {
  return '';
}

interface urlKeyVal {
  key: string;
  value: string | null;
}
