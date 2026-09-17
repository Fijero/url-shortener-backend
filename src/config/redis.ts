import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,

});

redisClient.on('connection', () => {
  console.log('redis conncted');
});

await redisClient.connect();
