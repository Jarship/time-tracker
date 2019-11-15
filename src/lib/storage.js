import moment from 'moment';
const TIMERS = "TIMERS";

export const getTimers = () => {
  return JSON.parse(sessionStorage.getItem(TIMERS)) || [];
};

export const getActiveTimers = () => {
  return getTimers().filter(timer => !timer.stopTime);
};

export const stopTimer = id => {
  const stopTime = new moment();
  let timers = getTimers();
  timers = timers.map(timer => {
    if (timer.id === id) {
      return { ...timer, stopTime: stopTime.format() }; //Update timer
    } else {
      return timer;
    }
  });
  sessionStorage.setItem(TIMERS, JSON.stringify(timers));
};

export const createTimer = description => {
  const startTime = new moment();
  const timers = getTimers();
  timers[timers.length] = { //Add a new timer
    id: String(timers.length),
    description,
    startTime: startTime.format()
  };
  sessionStorage.setItem(TIMERS, JSON.stringify(timers));
};