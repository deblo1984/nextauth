const express = require("express");
const users = require("../controllers/users");
const router = express.Router();

router.route("/").post(users.createUser).get(users.getUser);
router.route("/login").post(users.login);
router.route("/me").get(users.userProfile);

module.exports = router;
