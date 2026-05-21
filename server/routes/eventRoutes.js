import express from "express";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent
} from "../controllers/eventController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEvents);

router.post("/", protect, adminOnly, createEvent);

router.put("/:id", protect, adminOnly, updateEvent);

router.delete("/:id", protect, adminOnly, deleteEvent);

router.post("/join/:id", protect, joinEvent);

export default router;