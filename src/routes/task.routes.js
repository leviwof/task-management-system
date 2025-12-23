import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { listTasks, createTask, getTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
