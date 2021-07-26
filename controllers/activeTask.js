const { ActiveTask } = require("../models/activeTask");
const asyncCatchHandler = require("../utils/asyncCatchHandler");
const AppError = require('../utils/Error')

const activeTaskResponseCreator = (message, data) => ({
  status: "success",
  message,
  data: {
    activeTask: data,
  },
})

const getActiveTask = async (req, res, next) => {
  const { id } = req.user;

  const result = await ActiveTask.findOne({ userID: id });

  // return next(new AppError('Mock error', 501));
  res.status(200).json(activeTaskResponseCreator('Active task successful requested', result));
};

const updateActiveTask = async (req, res, next) => {
  const { id } = req.user;
  const newBody = JSON.parse(JSON.stringify(req.body))
  newBody.userID = id;

  const result = await ActiveTask.findOneAndUpdate({ userID: id }, newBody, {
    new: true,
  });

  // return next(new AppError('Mock error', 404));

  if (result === null) {
    const createdTask = await createNewActiveTask(newBody);
    res.status(200).json(activeTaskResponseCreator('Task has been created', createdTask));
    return;
  }

  res.status(200).json(activeTaskResponseCreator('Task has been updated', result));
};

exports.getActiveTask = asyncCatchHandler(getActiveTask);
exports.updateActiveTask = asyncCatchHandler(updateActiveTask);

async function createNewActiveTask(data) {
  const result = await ActiveTask.create(data);
  return result;
}
