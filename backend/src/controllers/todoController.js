const Todo = require("../models/Todo");

// ✅ GET TODOS
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ CREATE TODO
exports.createTodo = async (req, res) => {
  try {
    // 🔥 GET DATA FROM FRONTEND
    const {
      text,
      priority,
      dueDate,
      urgent,
      important,
      category,
    } = req.body;

    // ✅ CREATE
    const todo = await Todo.create({
      text,

      // 🔥 PRIORITY
      priority: priority || "low",

      // 🔥 DUE DATE
      dueDate: dueDate || null,

      // 🔥 MATRIX
      urgent: urgent || false,
      important: important || false,

      // 🔥 CATEGORY
      category: category || "Work",

      // ✅ DEFAULTS
      completed: false,
      user: req.user._id,
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // 🔥 TOGGLE STATUS
    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET TODO STATS
exports.getTodoStats = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user._id,
    });

    // 📊 BASIC STATS
    const total = todos.length;

    const completed = todos.filter(
      (todo) => todo.completed
    ).length;

    const pending = total - completed;

    const high = todos.filter(
      (todo) => todo.priority === "high"
    ).length;

    // 🔥 CATEGORY STATS
    const work = todos.filter(
      (todo) => todo.category === "Work"
    ).length;

    const study = todos.filter(
      (todo) => todo.category === "Study"
    ).length;

    const personal = todos.filter(
      (todo) => todo.category === "Personal"
    ).length;

    // 🔥 MATRIX STATS
    const urgentImportant = todos.filter(
      (todo) => todo.urgent && todo.important
    ).length;

    const importantOnly = todos.filter(
      (todo) => !todo.urgent && todo.important
    ).length;

    const urgentOnly = todos.filter(
      (todo) => todo.urgent && !todo.important
    ).length;

    const neither = todos.filter(
      (todo) => !todo.urgent && !todo.important
    ).length;

    res.json({
      total,
      completed,
      pending,
      high,

      // 🔥 CATEGORY
      work,
      study,
      personal,

      // 🔥 MATRIX
      urgentImportant,
      importantOnly,
      urgentOnly,
      neither,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};