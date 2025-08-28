import express from "express";
import { AllToDo, createToDo, deleteToDo } from "../controllers/ToDoController.js";

const router = express.Router();

router.get("/todos",AllToDo);
router.post("/todos",createToDo);
router.delete("/todos",deleteToDo);

export default router;