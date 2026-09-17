import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('connect', (e) => {
  console.log('Redis connected');
});

await redisClient.connect();
