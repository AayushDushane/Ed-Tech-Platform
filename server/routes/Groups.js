const express = require("express");
const router = express.Router();

const {CreateGroup , joinGroup } = require("../controllers/Groups");
const { auth, isAdmin } = require("../middlewares/auth")

router.post("/creategroup",auth ,isAdmin, CreateGroup);
router.post("/join", auth, joinGroup);


module.exports = router;