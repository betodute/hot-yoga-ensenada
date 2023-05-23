import './YogaClass.css';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';

export const YogaClass = (props) => {
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);

  const handleRegister = (event) => {
    let userID = user._id;
    let yogaClassID = props.singleClass._id;

    fetch('http://localhost:9000/reservation', {
      method: 'POST',
      body: JSON.stringify({ userID: userID, yogaClassID: yogaClassID }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setReservations([...reservations, data]); // Add the new reservation to the existing reservations array
      })
      .catch((error) => {
        console.error('Error making reservation:', error);
      });
  };

  const handleCancel = (event) => {
    let userID = user._id;
    let yogaClassID = props.singleClass._id;

    fetch('http://localhost:9000/reservation', {
      method: 'DELETE',
      body: JSON.stringify({ userID: userID, yogaClassID: yogaClassID }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(() => {
        setReservations(reservations.filter((reservation) => reservation.yogaClassID !== yogaClassID)); // Remove the canceled reservation from the reservations array
      })
      .catch((error) => {
        console.error('Error canceling reservation:', error);
      });
  };

  const isAlreadyReserved = () => {
    const { _id: yogaClassID } = props.singleClass;
    return reservations.some(
      (reservation) => reservation.userID === user._id && reservation.yogaClassID === yogaClassID
    );
  };

  return (
    <div className='single-class'>
      <label>
        {props.singleClass.day} {props.singleClass.time}
      </label>
      {isAlreadyReserved() ? (
        <button type='button' className='btn btn-danger m-2' onClick={handleCancel}>
          Cancelar
        </button>
      ) : (
        <button type='button' className='btn btn-warning m-2' onClick={handleRegister}>
          Reservar
        </button>
      )}
    </div>
  );
};


