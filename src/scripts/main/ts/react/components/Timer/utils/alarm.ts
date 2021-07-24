export const playAlarm = () => {
  const sounds = {
    alarm: '/audio/alarm.mp3',
    piggy: '/audio/piggy.mp3',
  };

  const audio = new Audio(sounds.piggy);
  audio.play();
};
