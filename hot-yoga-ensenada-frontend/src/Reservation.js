import './Reservation.css';
import { YogaClass } from './YogaClass';
import { useState, useEffect } from 'react';

export const Reservation = (props) => {
  const [yogaClasses, setYogaClasses] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchYogaClasses = async () => {
      try {
        const response = await fetch('http://localhost:9000/yogaclass');
        const data = await response.json();
        setYogaClasses(data);
        setFetchComplete(true);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchYogaClasses();
  }, []);

  if (!fetchComplete) {
    return null; // Return null or a loading spinner while the fetch is in progress
  }

  return (
    <div className='reservation-wrapper'>
      <form>
        {[
          ...yogaClasses.filter(element => element.day === 'Martes' && element.time === '7am'),
          ...yogaClasses.filter(element => element.day === 'Martes' && element.time === '6pm'),
          ...yogaClasses.filter(element => element.day === 'Jueves' && element.time === '7am'),
          ...yogaClasses.filter(element => element.day === 'Jueves' && element.time === '6pm'),
          ...yogaClasses.filter(element => element.day === 'Sábado' && element.time === '4pm')

        ].map(element => (
          <YogaClass key={element._id} singleClass={element} />
        ))}
      </form>
    </div>
  );
  
};


