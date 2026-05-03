const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
   toggleTodo
} = require("../controllers/todoController");

// =====================
// PROTECTED TODO ROUTES
// =====================
router.get("/stats", protect, getTodoStats);
router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.put("/toggle/:id", protect, toggleTodo); 
router.delete("/:id", protect, deleteTodo);

module.exports = router;