import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Panel from './panel';

function TimeClock({ active, setInactive, addActivity, current, setCurrent }) {
  const handleEnd = id => { // To stop a timer
    if (active.length === 1) {
      setCreate(true);
    }
    setMax(max - 1);
    setInactive(id);
  }; 

  const createTimer = () => { // To create a timer
    const timerDesc = description;
    setDescription("");
    setMax(max + 1);
    addActivity(timerDesc);
  };

  const [create, setCreate] = useState(true); // Default to create
  const [description, setDescription] = useState(""); // For new timers
  const [max, setMax] = useState(active.length - 1); // The total number of running timers
  return (
    <Panel>
      <div className="Top-bar">
        <div
          className={create ? "Active" : "Inactive Left"}
          onClick={() => setCreate(true)}
        >
          Create new timer
        </div>
        <div
          className={!create ? "Active": "Inactive Right"}
          onClick={() => {
            if(active.length > 0) {
              setCreate(false)
            }
          }}
        >
          Stop current timer
        </div>
      </div>
      {create
      ?
        <div className="Create">
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Activity Description"
          />
          <button onClick={() => createTimer()}>Start</button>
        </div>
      :
        <>
          <CurrentNav current={current} max={max} setCurrent={setCurrent} setMax={setMax} />
          <div className="Current">
            <div className="Current-timer">
              <p>Description</p>
              <p>Start Time</p>
            </div>
            <Current timer={active[current]} />
            <button onClick={() => handleEnd(active[current].id)}>Stop</button>
          </div>
        </>
      }
    </Panel>
  )
};

TimeClock.propTypes = {
  active: PropTypes.array.isRequired,
  setInactive: PropTypes.func.isRequired,
  addActivity: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired
};

const CurrentNav = ({ current, max, setCurrent, setMax }) => (
  <div className="Active-nav">
    <button disabled={current <= 0} onClick={() => setCurrent(current - 1)}>
      &lt;
    </button>
    <input
      value={current + 1}
      onChange={e => setCurrent(e.target.value)}
    />
    of
    <input
      value={max + 1}
      onChange={e => setMax(e.target.value)}
    />
    <button disabled={current >= max} onClick={() => setCurrent(current + 1)}>
      &gt;
    </button>
  </div>
);

CurrentNav.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setMax: PropTypes.func.isRequired
};

const Current = ({ timer: { description, startTime } }) => (
  <div className="Current-timer">
    <p>{description}</p>
    <p>{new moment(startTime).format('MMM Do, h:mm:ss a')}</p>
  </div>
);

Current.propTypes = {
  timer: PropTypes.shape({
    description: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired
  })
};

export default TimeClock;