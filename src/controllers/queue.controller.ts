import { Get, Route } from "tsoa";
import redisClient from "../utils/redis";
import { Response, Request } from "express";

interface QueueResponse {
  message: string;
  guildID: string;
  voiceChannel: string;
  queue: Array<Queue>;
}

interface Queue {
  title: string;
  url: string;
  thumbnail: string;
}

@Route("queue")
export default class QueueController {
  @Get("/:guildID")
  public async getQueue(guildID: string): Promise<QueueResponse | null> {
    const queue = await redisClient.get(`guild_${guildID}`);

    if (!queue) {
      return null;
    }
    const queueJson = JSON.parse(queue);

    console.log(queueJson);

    return {
      message: "Queue found",
      guildID: queueJson.voiceChannel.guildId,
      voiceChannel: queueJson.voiceChannel.id,
      queue: queueJson.songs,
    };
  }
}
