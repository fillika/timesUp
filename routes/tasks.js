const express = require("express");
const {
  getAllTasks,
  getMoreTasks,
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
router.route("/more").get(getMoreTasks);
router.route("/:id").patch(updateTask).delete(deleteTaskByID);

module.exports = router;
