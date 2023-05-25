import './YogaClass.css';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Reservation } from './Reservation';

export const YogaClass = (props) => {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9000/reservation')
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  }, []);

  useEffect(() => {
    const classID = props.singleClass._id;
    setIsReserved(
      reservations.some((reservation) => reservation.userID === user._id && reservation.yogaClassID === classID)
    );
  }, [reservations, props.singleClass._id, user._id]);

  const handleRegister = () => {
    const userID = user._id;
    const yogaClassID = props.singleClass._id;
    const show = 'pending' // 'pending', 'show', 'noshow'

    fetch('http://localhost:9000/reservation', {
      method: 'POST',
      body: JSON.stringify({ userID, yogaClassID, show }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setReservations([...reservations, data]);
      })
      .catch((error) => {
        console.error('Error making reservation:', error);
      });
  };

  const handleCancel = () => {
    const userID = user._id;
    const yogaClassID = props.singleClass._id;

    fetch('http://localhost:9000/reservation', {
      method: 'DELETE',
      body: JSON.stringify({ userID, yogaClassID }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        setReservations(reservations.filter((reservation) => reservation.yogaClassID !== yogaClassID));
      })
      .catch((error) => {
        console.error('Error canceling reservation:', error);
      });
  };

  const isClassDisabled = () => {
    const daysInSpanish = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const currentDayIndex = new Date().getDay() - 1;
    const classDayIndex = daysInSpanish.indexOf(props.singleClass.day.toLowerCase());

    if (currentDayIndex === -1 || classDayIndex === -1) {
      return true;
    }

    if (currentDayIndex > classDayIndex) {
      return true;
    }

    if (currentDayIndex === classDayIndex) {
      const currentTime = new Date();
      const classTime = parseClassTime(props.singleClass.time);

      return currentTime > classTime;
    }

    return false;
  };

  const parseClassTime = (time) => {
    const timeComponents = time.split(/(\d+)(am|pm)/);
    const hours = parseInt(timeComponents[1], 10);
    const isPM = timeComponents[2] === 'pm';

    let parsedTime = new Date();
    parsedTime.setHours(hours);
    if (isPM && hours < 12) {
      parsedTime.setHours(parsedTime.getHours() + 12);
    }

    return parsedTime;
  };

  const getReservationByClassAndUser = () => {
    const classID = props.singleClass._id;
    const reservation = reservations.find(
      (res) => res.yogaClassID === classID && res.userID === user._id
    );
    return reservation;
  };
 
  const rootClassName = `single-class ${!isReserved && isClassDisabled() ? 'disable' : ''}`

  return (
    <div className={rootClassName}>
      <label>
        {props.singleClass.day} {props.singleClass.time}
      </label>
      {isReserved ? (
        <React.Fragment>
          {getReservationByClassAndUser()?.show === 'no-show' ? (
            <button type="button" className="btn btn-dark m-2" onClick={handleCancel}>
              No-Show
            </button>
          ) : (
            <button type="button" className="btn btn-danger m-2" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </React.Fragment>
      ) : (
        <button type='button' className='btn btn-warning m-2' onClick={handleRegister}>
          Reservar
        </button>
      )}
    </div>
  );
};




