export const sounds = {
  alarm: new Audio('/audio/alarm.mp3'),
  piggy: new Audio('/audio/piggy.mp3'),
};

export const playAlarm = () => sounds.piggy.play();
