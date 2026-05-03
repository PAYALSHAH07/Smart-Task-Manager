const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    // ✅ Priority (existing)
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    // ✅ Completed (existing)
    completed: {
      type: Boolean,
      default: false,
    },

    // ✅ Due Date (existing)
    dueDate: {
      type: Date,
    },

    // 🔥 NEW: Eisenhower Matrix
    urgent: {
      type: Boolean,
      default: false,
    },

    important: {
      type: Boolean,
      default: false,
    },

    // ✅ User (existing)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);