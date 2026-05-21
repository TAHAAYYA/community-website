import express from "express";
import {
  getMembers,
  approveMember,
  rejectMember,
  updateMember,
  deleteMember
} from "../controllers/memberController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMembers);

router.put("/approve/:id", protect, adminOnly, approveMember);

router.delete("/reject/:id", protect, adminOnly, rejectMember);

router.put("/:id", protect, adminOnly, updateMember);

router.delete("/:id", protect, adminOnly, deleteMember);

export default router;