import './Schedule.css';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { YogaClass } from './YogaClass';

export const Schedule = () => {
  const [reservedClasses, setReservedClasses] = useState({});
  const [classes, setClasses] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchClasses = async () => {
      const url = "http://localhost:9000/yogaclass";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching yoga classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleReserve = (day, id) => {
    setReservedClasses((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));

    
    console.log('this is the user object from useContext', user);
    console.log('this is the user.id', user._id);
    console.log('this is the YogaClass id', id);
  };

  return (
    <div className='schedule-container'>
      <div className='classes-container row'>
        {classes.map(({ _id, day, time }) => (
          <YogaClass
            key={_id}
            title={`${day} ${time}`}
            reserved={reservedClasses[day]}
            onReserve={() => handleReserve(day, _id)}
          />
        ))}
      </div>
    </div>
  );
};




