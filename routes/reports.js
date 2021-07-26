const express = require("express");
const { checkIsLogin } = require('../controllers/authController')
const { getStats } = require("../controllers/report")

const router = express.Router();

router.use(checkIsLogin)

router.route("/").get(getStats);

module.exports = router;