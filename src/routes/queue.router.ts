import express from "express";
import QueueController from "../controllers/queue.controller";

const router = express.Router();

router.get("/:guildID", async (req, res) => {
  const controller = new QueueController();
  const response = await controller.getQueue(req.params.guildID);
  if (!response) res.status(404).json({ message: "No Queue Found" });
  return res.send(response);
});

export default router;
