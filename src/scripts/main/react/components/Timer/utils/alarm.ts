export const sounds = {
  // alarm: new Audio('/audio/alarm.mp3'),
  // piggy: new Audio('/audio/piggy.mp3'),
  guitar: new Audio('/audio/guitar.mpeg'),
};

sounds.guitar.volume = 0.5;

export const playAlarm = () => sounds.guitar.play();
export const stopAlarm = () => {
  sounds.guitar.pause()
  sounds.guitar.currentTime = 0;
};
export const setVolume = (volume: number) => sounds.guitar.volume = volume;
