const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:userID", UsersController.Index);

module.exports = router;