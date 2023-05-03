const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/", usersController.Create);
router.get("/:userID", usersController.Index);

module.exports = router;