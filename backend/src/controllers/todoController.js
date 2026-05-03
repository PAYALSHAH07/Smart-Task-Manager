const Todo = require("../models/Todo");

// ✅ GET TODOS (ONLY LOGGED-IN USER)
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ CREATE TODO (🔥 UPDATED WITH MATRIX FIELDS)
exports.createTodo = async (req, res) => {
  try {
    const { text, priority, dueDate, urgent, important } = req.body;

    const todo = await Todo.create({
      text,

      // 🔥 EXISTING
      priority: priority || "low",
      dueDate: dueDate || null,

      // 🔥 NEW (VERY IMPORTANT)
      urgent: urgent || false,
      important: important || false,

      completed: false,
      user: req.user._id,
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ TOGGLE COMPLETE
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ STATS
exports.getTodoStats = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const high = todos.filter(t => t.priority === "high").length;

    res.json({ total, completed, pending, high });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};