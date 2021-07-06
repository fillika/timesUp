const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTaskByID,
  deleteManyTaskByName,
  updateManyTasks
} = require("../controllers/tasks");
const {checkIsLogin} = require('../controllers/authController')

const router = express.Router();

router.use(checkIsLogin)

router.route("/").get(getAllTasks).post(createTask).delete(deleteManyTaskByName).patch(updateManyTasks);
router.route("/:id").patch(updateTask).delete(deleteTaskByID);

module.exports = router;
