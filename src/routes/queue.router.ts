import express from "express";
import QueueController from "../controllers/queue.controller";

const router = express.Router();

router.get("/:guildID", async (req, res) => {
  const controller = new QueueController();
  const response = await controller.getQueue(req.params.guildID);
  if (!response) return res.status(404).json({ message: "No Queue Found" });
  return res.send(response);
});

router.post("/:guildID", async (req, res) => {
  if (!req.body.url)
    return res.status(400).json({ message: "No URL Provided" });
  if (!req.body.thumbnail)
    return res.status(400).json({ message: "No Thumbnail Provided" });
  if (!req.body.title)
    return res.status(400).json({ message: "No Title Provided" });
  const controller = new QueueController();
  const response = await controller.updateQueue(req.params.guildID, req.body);
  if (!response) return res.status(404).json({ message: "No Queue Found" })
  return res.send(response);
});

export default router;
