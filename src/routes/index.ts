import express from "express";
import QueueRouter from "./queue.router";

const router = express.Router();

router.use("/queue", QueueRouter);

export default router;
