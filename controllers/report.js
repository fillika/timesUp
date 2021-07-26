
const { TaskModel } = require("../models/task");
const AppError = require("../utils/Error");
const asyncCatchHandler = require("../utils/asyncCatchHandler");

exports.getStats = asyncCatchHandler(getStats)

async function getStats(req, res, next) {
  const { name, start, stop } = req.query;

  if (!name || !start || !stop) {
    return next(new AppError('You must to provide name, start and stop params', 400))
  }

  const queryObj = {
    userID: req.user._id,
    name: new RegExp(name, 'gi'),
    $and: [
      { start: { $gte: start } },
      { stop: { $lte: stop } }
    ]
  }

  const result = await TaskModel.find(queryObj).sort({ at: "desc" });

  res.status(200).json({
    status: "success",
    message: "getStats",
    data: {
      queryObj,
      result
    }
  })
}