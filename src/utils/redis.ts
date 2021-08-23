import dotenv from "dotenv";
import { createNodeRedisClient } from "handy-redis";

dotenv.config();

const PORT: number = parseInt(process.env.PORT!);
const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASSWORD;

const redisClient = createNodeRedisClient({
  host: host,
  port: PORT,
  auth_pass: password,
});

export default redisClient;
