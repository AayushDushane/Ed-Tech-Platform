const Group = require("../models/Groups");
const Category = require("../models/Category");

const CreateGroup = async (req, res) => {
  try {
    const { name, description, category } = req.body;  // `category` in lowercase
    const adminId = req.user.id;

    // Ensure all required fields are present
    if (!name || !category || !adminId) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Check if the provided category exists
    const categoryExists = await Category.findById(category);  // `category` is passed correctly
    if (!categoryExists) {
      return res.status(404).json({
        error: "Category not found"
      });
    }

    // Create new group
    const newGroup = new Group({
      name,
      description,
      category,  // Ensure category is assigned correctly
      admin: adminId,
      members: [adminId],  // Add admin as the first member
    });

    // Save the new group
    await newGroup.save();

    // Respond with success
    res.status(201).json({ message: "Group created successfully", group: newGroup });

  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Error while creating Group", error: error.message });
  }
};

module.exports = { CreateGroup };
