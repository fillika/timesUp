class Task {
  constructor() {
    this.oneDayLength = 86400000;
  }

  createTaskFromNextDay(data) {
    const result = [];
    const dataCopy = JSON.parse(JSON.stringify(data));

    let start = dataCopy.start,
      duration = dataCopy.duration;
    this.createTaskListFromLongDate(data, start, duration, result);
    return result.reverse();
  }

  createTaskListFromLongDate(data, start, duration, result) {
    const { startNextDayTimestamp, restTimeOfCurrentDayInMS } = this.countNextDayAndRest(start);

    result.push({
      ...data,
      start: start,
      stop: startNextDayTimestamp - 1,
      at: startNextDayTimestamp - 1,
      duration: restTimeOfCurrentDayInMS,
    });    

    start = startNextDayTimestamp;
    duration -= this.oneDayLength;

    if (duration > this.oneDayLength) {
      this.createTaskListFromLongDate(data, start, duration, result);
    } else {
      result.push({
        ...data,
        start: start,
        stop: new Date(data.stop).getTime(),
        at: new Date(data.stop).getTime() + 1000,
        duration: new Date(data.stop).getTime() - start
      });
    }
  }

  /**
   * Функция вычисляет кол-во миллисекунд до конца дня с момента начала таска.
   * @param {number} start кол-во миллисекунд, время начала таска 
   * @returns Возвращает таймштамп начала следующего дня и остаток текущего дня
   */
  countNextDayAndRest(start) {
    const startDay = {
      day: new Date(start).getDate(),
      month: new Date(start).getMonth() + 1,
      year: new Date(start).getFullYear(),
    };

    const currentDate = `${startDay.year}-${startDay.month}-${startDay.day}`;

    const currentDayInMs = new Date(currentDate).getTime(); // Нахожу начало текущего дня
    const startNextDayTimestamp = currentDayInMs + this.oneDayLength; // Нахожу начало следующего дня
    const restTimeOfCurrentDayInMS = startNextDayTimestamp - new Date(start).getTime(); // Это остаток для текущего дня у задачи.

    return {
      startNextDayTimestamp,
      restTimeOfCurrentDayInMS,
    };
  }
}

const taskManager = new Task();

module.exports = taskManager;
