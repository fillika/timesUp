const _ = require("lodash");
const { TaskModel } = require("../models/task");
const taskManager = require("../utils/Task");
const AppError = require("../utils/Error");
const asyncCatchHandler = require("../utils/asyncCatchHandler");

const limit = 80;

exports.getAllTasks = asyncCatchHandler(getAllTasks);
exports.getMoreTasks = asyncCatchHandler(getMoreTasks);
exports.createTask = asyncCatchHandler(createTask);
exports.updateTask = asyncCatchHandler(updateTask);
exports.updateManyTasks = asyncCatchHandler(updateManyTasks);
exports.deleteTaskByID = asyncCatchHandler(deleteTaskByID);
exports.deleteManyTaskByName = asyncCatchHandler(deleteManyTaskByName);

// Utils
function getTasks(model, userID, limit) {
  return model.find({ userID: userID }).limit(limit).sort({ at: "desc" });
}
async function getAllTasks(req, res, next) {
  const result = await getTasks(TaskModel, req.user.id, limit);

  res.status(200).json({
    status: "success",
    message: "Get all tasks",
    data: {
      tasks: result,
      isLoadMore: result.length === limit
    },
  });
}
async function getMoreTasks(req, res, next) {
  const { page } = req.body;
  const skip = limit * page - limit;

  const result = model.find({ userID: req.user.id })
    .skip(skip)
    .limit(limit)
    .sort({ at: "desc" });

  res.status(200).json({
    status: "success",
    data: {
      tasks: result,
      isLoadMore: result.length === limit
    },
  });
}
async function createTask(req, res, next) {
  // Проверить at и start.
  const { at, start } = req.body;
  const nextDay = new Date(at).getDate();
  const currentDay = new Date(start).getDate();

  if (currentDay !== nextDay) {
    // Если это разные дни, тогда мы разбиваем таск и создаем 2 задачи
    const taskArray = taskManager.createTaskFromNextDay(req.body);
    const tasks = await TaskModel.create(taskArray);

    res.status(200).json({
      status: "success",
      action: "CREATE",
      message: "All tasks have been created",
      data: {
        task: tasks,
      },
    });
  } else {
    const newTask = JSON.parse(JSON.stringify(req.body));
    newTask.userID = req.user.id;
    const task = await TaskModel.create(newTask);

    res.status(200).json({
      status: "success",
      action: "CREATE",
      message: "Task has been created",
      data: {
        task,
      },
    });
  }
}
async function updateTask(req, res, next) {
  const { id } = req.params;
  await TaskModel.findByIdAndUpdate(id, req.body);

  res.status(204).json({
    status: "success",
    message: "Task was updated",
  });
}

async function updateManyTasks(req, res, next) {
  const { name, date, set } = req.body;

  if (name && date && set) {
    const dateStart = new Date(date.slice(0, 10));
    const nextDay = new Date(dateStart).getTime() + 86400000;
    const dateEnd = new Date(nextDay);

    const query = {
      name: name,
      at: {
        $gte: dateStart,
        $lte: dateEnd,
      },
    };

    const updateResult = await TaskModel.updateMany(query, set);

    if (updateResult.n > 0) {
      res.status(204).json({
        status: "success",
        message: "Task was deleted",
      });
    } else {
      next(new AppError("Something went wrong in updateManyTasks", 400));
    }
  } else {
    next(
      new AppError(
        "You have to send NAME and DATE and SET in Body.JSON in updateManyTasks",
        400
      )
    );
  }
}
async function deleteTaskByID(req, res, next) {
  const { id } = req.params;

  if (id) {
    await TaskModel.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      message: "Task was deleted",
    });
  } else {
    next(new AppError("You have to send :ID param in deleteTaskByID", 400));
  }
}
async function deleteManyTaskByName(req, res, next) {
  const { name, date } = req.body;
  // Todo проверка на DATE
  const dateStart = new Date(date.slice(0, 10));
  const nextDay = new Date(dateStart).getTime() + 86400000;
  const dateEnd = new Date(nextDay);

  if (name && date) {
    const query = {
      name: name,
      at: {
        $gte: dateStart,
        $lte: dateEnd,
      },
    };
    const result = await TaskModel.deleteMany(query);

    if (result.deletedCount) {
      res.status(204).json({
        status: "success",
        message: "All task was deleted",
      });
    } else {
      next(new AppError("Task does not exist in deleteManyTaskByName", 400));
    }
  } else {
    next(
      new AppError(
        "You have to send NAME in Body.JSON in deleteManyTaskByName",
        400
      )
    );
  }
}
