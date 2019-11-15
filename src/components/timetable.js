import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TimeTable = ({ children }) => {
  return (
    <div className="Time-table">
      <div>
        <p>Description</p>
        <p>Start time</p>
        <p>End time</p>
        <p>Duration</p>
      </div>
      {children}
    </div>
  );
};

TimeTable.propTypes = {
  children: PropTypes.any
};

export const Activities = ({ timer: { description, startTime, stopTime }, ...otherProps }) => {
  const start = new moment(startTime);
  const [stop, setStop] = useState(new moment(stopTime) || '');

  useEffect(() => {
    let timer;
    if (!stopTime) { //Update every second if it's not stopped
      timer = setInterval(() => setStop(new moment()), 1000);
    }
    return () => clearInterval(timer);
  })

  let elapsed = moment.duration(start.diff(stop));


  return (
    <div className="Activity" {...otherProps}>
      <p>{description}</p>
      <p>{start.format('MMM Do, h:mm:ss a')}</p>
      <p>{stopTime && stop.format('MMM Do, h:mm:ss a')}</p>
      <p>{elapsed.humanize()}</p>
    </div>
  );
};

Activities.propTypes = {
  timer: PropTypes.shape({
    description: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    stopTime: PropTypes.string
  })
};

export default TimeTable;