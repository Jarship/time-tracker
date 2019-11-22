import React, { useState } from 'react';
import TimeClock from './components/timeclock';
import ActivityGrid from './components/activity';
import Description from './components/description';
import './App.css';
import { getTimers, getActiveTimers, stopTimer, createTimer } from './lib/storage';


function App() {
  const [timers, setTimers] = useState(getTimers());
  const [active, setActive] = useState(getActiveTimers());
  const [current, setCurrent] = useState(0);
  const updateTimers = () => {
    setTimers(getTimers());
    setActive(getActiveTimers());
  }
  const newTimer = description => {
    createTimer(description);
    updateTimers();
  };
  const updateTimer = id => {
    stopTimer(id);
    updateTimers();
  };

  const handleCurrentChange = id => {
    active.forEach((timer, idx) => {
      if (timer.id === id) {
        setCurrent(idx);
      }
    })
  }

  return (
    <div className="App">
      <div className="Panel-holder">
        <TimeClock active={active} setInactive={updateTimer} addActivity={newTimer} current={current} setCurrent={setCurrent}/>
        <ActivityGrid activities={timers} selectActivity={handleCurrentChange} />
        <Description />
      </div>
    </div>
  );
}

export default App;
