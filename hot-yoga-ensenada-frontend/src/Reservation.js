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

  // Define custom order for the days of the week
  const dayOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Sort yogaClasses array by day, time, and session
  const sortedYogaClasses = yogaClasses.sort((a, b) => {
    const dayComparison = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);

    if (dayComparison === 0) {
      if (a.time === b.time) {
        return a.session.localeCompare(b.session);
      }
      if (a.time === '7am') {
        return -1; // 7am comes before other times
      }
      if (b.time === '7am') {
        return 1; // Other times come after 7am
      }
      return a.time.localeCompare(b.time);
    }

    return dayComparison;
  });

  return (
    <div className='reservation-wrapper'>
      <form className='row'>
        {/* Render each YogaClass component based on day */}
        {sortedYogaClasses.map((element) => {
          const { day, time } = element;

          if (isPastDateTime(day, time)) {
            return (
              <div key={element._id} className='col-12'>
                <YogaClass singleClass={element} className='disable' />
              </div>
            );
          } else {
            return (
              <div key={element._id} className={`col-md-${getColumnWidth(day)}`}>
                <YogaClass singleClass={element} />
              </div>
            );
          }
        })}
      </form>
    </div>
  );
};

// Helper function to check if a given day and time is past the current date and time
const isPastDateTime = (day, time) => {
  const currentDate = new Date(); // Get the current date and time
  const dayOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const currentDayOfWeek = dayOrder[currentDate.getDay()];
  const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  if (day === currentDayOfWeek) {
    return time < currentTime;
  } else if (dayOrder.indexOf(day) < dayOrder.indexOf(currentDayOfWeek)) {
    return true;
  } else {
    return false;
  }
};

// Helper function to determine the column width based on day
const getColumnWidth = (day) => {
  if (day === 'Martes') {
    return '6'; // Render Martes classes on a 6-column width
  } else if (day === 'Jueves') {
    return '6'; // Render Jueves classes on a 6-column width
  } else if (day === 'Sábado') {
    return '12'; // Render Sábado classes on a 12-column width (full width)
  } else {
    return '12'; // For other days, render on a 12-column width (full width)
  }
};









