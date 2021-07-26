
const { TaskModel } = require("../models/task");
const asyncCatchHandler = require("../utils/asyncCatchHandler");

exports.getStats = asyncCatchHandler(getStats)

async function getStats(req, res, next) {
  const { name, date } = req.query;

  res.status(200).json({
    status: "success",
    message: "getStats",
    data: {
      name,
      date
    }
  })
}