import './Schedule.css';
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { YogaClass } from './YogaClass';

export const Schedule = () => {
  const [reservedClasses, setReservedClasses] = useState({});
  const { user } = useContext(UserContext);

  const handleReserve = (day) => {
    setReservedClasses((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
    console.log('reserved?', reservedClasses[day]);
    console.log('this is the user object from useContext', user);
    console.log('this is the user.id', user._id);
  };

  const classes = [
    { day: 'lunes', time: '7am' },
    { day: 'martes', time: '6pm' },
    { day: 'miercoles', time: '7am' },
    { day: 'jueves', time: '6pm' },
    { day: 'viernes', time: '7am' },
    { day: 'sábado', time: '8am' },
  ];

  return (
    <div className='schedule-container'>
      <div className='classes-container row'>
        {classes.map(({ day, time }) => (
          <YogaClass
            key={day}
            title={`${day} ${time}`}
            reserved={reservedClasses[day]}
            onReserve={() => handleReserve(day)}
          />
        ))}
      </div>
    </div>
  );
};


