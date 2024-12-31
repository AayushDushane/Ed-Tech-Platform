const express = require("express");
const router = express.Router();

const {CreateGroup} = require("../controllers/Groups");
const { auth, isAdmin } = require("../middlewares/auth")

router.post("/creategroup",auth ,isAdmin, CreateGroup);

module.exports = router;