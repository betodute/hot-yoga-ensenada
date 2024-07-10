import React, { useState, useEffect } from "react";
import './AdminOLD.css';

export const Admin = () => {
  const [yogaClasses, setYogaClasses] = useState([]);
  const [reservations, setReservations]= useState([]);
  const [classCount, setClassCount] = useState(0);

  const [yogaClassDetails, setYogaClassDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (classCount === 5) {
      // No need to make the fetch requests if classCount is 5
      return;
    }
  
    fetch('http://localhost:9000/reservation')
      .then((response) => response.json())
      .then((reservationsData) => {
        setReservations(reservationsData);
  
        // Create an array of promises for the fetch requests
        const yogaClassPromises = reservationsData.map((reservation) => {
          const yogaClassId = reservation.yogaClassID;
          return fetch(`http://localhost:9000/yogaclass/${yogaClassId}`)
            .then((response) => response.json());
        });
  
        const userPromises = reservationsData.map((reservation) => {
          const userId = reservation.userID;
          return fetch(`http://localhost:9000/user/${userId}`)
            .then((response) => response.json());
        });
  
        // Execute all the promises concurrently using Promise.all
        Promise.all(yogaClassPromises)
          .then((yogaClassDetails) => {
            // Process the results of the yogaClass fetch requests
            setYogaClassDetails(yogaClassDetails);
          })
          .catch((error) => {
            // Handle any errors from the yogaClass fetch requests
            console.error('Error:', error);
          });
  
        Promise.all(userPromises)
          .then((userDetails) => {
            // Process the results of the user fetch requests
            setUserDetails(userDetails);
          })
          .catch((error) => {
            // Handle any errors from the user fetch requests
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        // Handle any errors from the first fetch request
        console.error('Error:', error);
      });
  }, [classCount]);
  
  

  const generateClasses = () => {
    let nextDates = getNextDates();
    let yogaClassesTemplate = [
      {date: nextDates[0], day:'Lunes', time: '7am', active: true},
      {date: nextDates[1], day:'Martes', time: '6pm', active: true},
      {date: nextDates[2], day:'Miercoles', time: '7am', active: true},
      {date: nextDates[3], day:'Jueves', time: '6pm', active: true},
      {date: nextDates[4], day:'Viernes', time: '7am', active: true},
      {date: nextDates[5], day:'Sábado', time: '12pm', active: true}
    ];
    genClassesBackend(yogaClassesTemplate);
  };

  const getNextDates = () => {
    const today = new Date();
    const daysToAdd = [1, 2, 3, 4, 5, 6]; // Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday
    const nextDates = [];

    for (const dayToAdd of daysToAdd) {
      const dayOfWeek = (dayToAdd - today.getDay() + 7) % 7;
      const daysUntilNextDate = dayOfWeek === 0 ? 7 : dayOfWeek;
      const nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextDate);
      nextDates.push(nextDate.toLocaleDateString());
    }
    return nextDates;
  };

  const genClassesBackend = async (preYogaClasses) => {
    try {
      const promises = preYogaClasses.map(async (element) => {
        const response = await fetch('http://localhost:9000/yogaclass', {
          method: 'POST',
          body: JSON.stringify({ date: element.date, day: element.day, time: element.time, active: element.active }),
          headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
      });
      const results = await Promise.all(promises);
      setYogaClasses(results);
      setClassCount(classCount + preYogaClasses.length); // Increment the class count
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirmUser = (reservationID) => {
    fetch(`http://localhost:9000/reservation/${reservationID}`, {
      method: 'PUT',
      body: JSON.stringify({ show: 'show' }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Reservation ${reservationID} marked as show.`);
        } else {
          throw new Error('Error updating reservation.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const cancelUser = (reservationID) => {
    fetch(`http://localhost:9000/reservation/${reservationID}`, {
      method: 'PUT',
      body: JSON.stringify({ show: 'no-show' }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Reservation ${reservationID} marked as no-show.`);
        } else {
          throw new Error('Error updating reservation.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='admin-wrapper'>
      <h3 className='admin-headline'> Admin </h3>
      <button className='gen-classes btn btn-warning' onClick={generateClasses} disabled={classCount === 5}>
        Generate Classes
      </button>
      <div className='classes-wrapper'>
        <div className='date-time' id='tue-am'>
          Martes 7am
          {userDetails.length > 0 && yogaClassDetails.length > 0 && yogaClassDetails.map((classDetail, index) => {
            if (classDetail.day === 'Martes' && classDetail.time === '7am' && userDetails[index]) {
              return (
                <div className='user-info' key={userDetails[index]._id}>
                  <div className='user-name'>{userDetails[index].name} </div>
                  <button className='btn btn-warning' onClick={() => confirmUser(reservations[index]._id)}>Show</button>
                  <button className='btn btn-danger' onClick={() => cancelUser(reservations[index]._id)}>No Show</button>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className='date-time' id='tue-pm'>
          Martes 6pm
          {userDetails.length > 0 && yogaClassDetails.length > 0 && yogaClassDetails.map((classDetail, index) => {
            if (classDetail.day === 'Martes' && classDetail.time === '6pm' && userDetails[index]) {
              return (
                <div className='user-info' key={userDetails[index]._id}>
                  <div className='user-name'>{userDetails[index].name} </div>
                  <button className='btn btn-warning' onClick={() => confirmUser(reservations[index]._id)}>Show</button>
                  <button className='btn btn-danger' onClick={() => cancelUser(reservations[index]._id)}>No Show</button>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className='date-time' id='thu-am'>
          Jueves 7am
          {userDetails.length > 0 && yogaClassDetails.length > 0 && yogaClassDetails.map((classDetail, index) => {
            if (classDetail.day === 'Jueves' && classDetail.time === '7am' && userDetails[index]) {
              return (
                <div className='user-info' key={userDetails[index]._id}>
                  <div className='user-name'>{userDetails[index].name} </div>
                  <button className='btn btn-warning' onClick={() => confirmUser(userDetails[index]._id)}>Show</button>
                  <button className='btn btn-danger' onClick={() => cancelUser(userDetails[index]._id)}>No Show</button>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className='date-time' id='thu-pm'>
          Jueves 6pm
          {userDetails.length > 0 && yogaClassDetails.length > 0 && yogaClassDetails.map((classDetail, index) => {
            if (classDetail.day === 'Jueves' && classDetail.time === '6pm' && userDetails[index]) {
              return (
                <div className='user-info' key={userDetails[index]._id}>
                  <div className='user-name'>{userDetails[index].name} </div>
                  <button className='btn btn-warning' onClick={() => confirmUser(userDetails[index]._id)}>Show</button>
                  <button className='btn btn-danger' onClick={() => cancelUser(userDetails[index]._id)}>No Show</button>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className='date-time' id='sat-pm'>
          Sábado 4pm
          {userDetails.length > 0 && yogaClassDetails.length > 0 && yogaClassDetails.map((classDetail, index) => {
            if (classDetail.day === 'Sábado' && classDetail.time === '4pm' && userDetails[index]) {
              return (
                <div className='user-info' key={userDetails[index]._id}>
                  <div className='user-name'>{userDetails[index].name} </div>
                  <button className='btn btn-warning' onClick={() => confirmUser(userDetails[index]._id)}>Show</button>
                  <button className='btn btn-danger' onClick={() => cancelUser(userDetails[index]._id)}>No Show</button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );  
};
  



