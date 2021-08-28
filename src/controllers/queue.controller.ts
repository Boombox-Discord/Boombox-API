import { Get, Route, Post, Body } from "tsoa";
import redisClient from "../utils/redis";
import { Response, Request, request } from "express";

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

interface UpdateQueueParams {
  url: string;
  thumbnail: string;
  title: string;
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

    return {
      message: "Queue found",
      guildID: queueJson.voiceChannel.guildId,
      voiceChannel: queueJson.voiceChannel.id,
      queue: queueJson.songs,
    };
  }

  @Post("/:guildID")
  public async updateQueue(
    guildID: string,
    @Body() requestBody: UpdateQueueParams
  ): Promise<QueueResponse | null> {
    const queue = await redisClient.get(`guild_${guildID}`);
    if (!queue) {
      return null;
    }
    const queueJson = JSON.parse(queue);

    queueJson.songs.push({
      title: requestBody.title,
      url: requestBody.url,
      thumbnail: requestBody.thumbnail,
    });

    await redisClient.set(`guild_${guildID}`, JSON.stringify(queueJson));

    return {
      message: "Queue Updated",
      guildID: queueJson.voiceChannel.guildId,
      voiceChannel: queueJson.voiceChannel.id,
      queue: queueJson.songs,
    };
  }
}
