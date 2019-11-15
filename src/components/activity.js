import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import TimeTable, { Activities } from './timetable';

const ActivityGrid = ({ activities, selectActivity }) => {
  const handleClick = id => {
    console.log("Click set");
    return () => {
      console.log('Set clicked');
      selectActivity(id);
    }
  };
  return (
      <Panel>
      <h2>Activities</h2>
      <TimeTable>
        {activities.map((item, key) => (
          <Activities onClick={handleClick(item.id)} key={key} timer={item} />
        ))}
      </TimeTable>
    </Panel>
  );
      };

ActivityGrid.propTypes = {
  activities: PropTypes.array.isRequired,
  selectActivity: PropTypes.func.isRequired
};

export default ActivityGrid;