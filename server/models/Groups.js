const mongoose = require("mongoose");
const Category = require("./Category"); // Import the Category model if not already

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {  // Use lowercase 'category' here (not Category)
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,  // Ensure this field is required
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Group", groupSchema);
