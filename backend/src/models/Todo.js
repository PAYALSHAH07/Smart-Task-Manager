const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    // ✅ TASK TEXT
    text: {
      type: String,
      required: true,
    },

    // ✅ PRIORITY
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    // ✅ COMPLETED
    completed: {
      type: Boolean,
      default: false,
    },

    // ✅ DUE DATE
    dueDate: {
      type: Date,
      default: null,
    },

    // 🔥 URGENT
    urgent: {
      type: Boolean,
      default: false,
    },

    // 🔥 IMPORTANT
    important: {
      type: Boolean,
      default: false,
    },

    // 🔥 CATEGORY
    category: {
      type: String,
      enum: ["Work", "Study", "Personal"],
      default: "Work",
    },

    // ✅ USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);