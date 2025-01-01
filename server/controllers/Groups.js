const Group = require("../models/Groups");
const Category = require("../models/Category");
const Groups = require("../models/Groups");

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




const joinGroup = async (req, res) => {
  try {
      const { groupId } = req.body; // Get groupId from body
      const userId = req.user.id; // User ID from token

      if (!groupId) {
          return res.status(400).json({
              success: false,
              message: "Group ID is required",
          });
      }

      const group = await Group.findById(groupId);
      if (!group) {
          return res.status(404).json({
              success: false,
              message: "Group not found",
          });
      }

      if (group.members.includes(userId)) {
          return res.status(400).json({
              success: false,
              message: "User is already a member of the group",
          });
      }

      group.members.push(userId);
      await group.save();

      res.status(200).json({
          success: true,
          message: "Successfully joined the group",
          group,
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Error joining group",
          error: error.message,
      });
  }
};

module.exports = { CreateGroup, joinGroup };
