import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Admin.css';

export const Admin = () => {
  const [yogaDate, setYogaDate] = useState(new Date());
  const [classActive, setClassActive] = useState(true);
  const [yogaType, setYogaType] = useState("Hot Yoga");
  const [yogaClasses, setYogaClasses] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Teacher State
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState('');
  const [teacherPicture, setTeacherPicture] = useState('');
  const [teacherBio, setTeacherBio] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all yoga classes
        const yogaClassesResponse = await fetch('http://localhost:9000/yogaclass');
        const yogaClassesData = await yogaClassesResponse.json();
        setYogaClasses(yogaClassesData);

        // Fetch all reservations
        const reservationsResponse = await fetch('http://localhost:9000/reservation');
        const reservationsData = await reservationsResponse.json();
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setYogaClasses([]);
        setReservations([]);
      }
    };

    fetchData();
  }, []);

  // Step 1: Group reservations by yogaClassID
  const reservationsByClass = reservations.reduce((acc, reservation) => {
    if (!acc[reservation.yogaClassID]) {
      acc[reservation.yogaClassID] = [];
    }
    acc[reservation.yogaClassID].push({
      userName: reservation.userName,
      userID: reservation.userID,
    });
    return acc;
  }, {});


  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    const day = new Intl.DateTimeFormat('es-ES', options).format(date);
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  async function handleCreateYoga(event) {
    event.preventDefault();

    const yogaDay = getDayOfWeek(yogaDate);
    const yogaTime = yogaDate.toTimeString().split(' ')[0];

    try {
      const response = await fetch('http://localhost:9000/yogaclass', {
        method: 'POST',
        body: JSON.stringify({
          yogaDate: yogaDate.toISOString().split('T')[0],
          yogaDay,
          yogaTime,
          teacherName,
          yogaType,
          classActive
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
      }

      const json = await response.json();
      console.log("this is the data response in json", json);

    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleCreateTeacher(event) {
    event.preventDefault();
    console.log('hit the handle create teacher function')
    console.log(teacherName, teacherEmail, teacherPhoneNumber, teacherPicture, teacherBio);
  }

  useEffect(() => {
    if (classActive) {
      console.log('this is the date');
      console.log(yogaDate);
    }
  }, [yogaDate]);

  return (
    <div className='admin-wrapper d-flex flex-column align-items-center'>
      <div className='admin-heading w-100 d-flex justify-content-center'>
        <h2 className='admin-heading'>Admin</h2>
      </div>
      <div className='create-yoga-wrapper d-flex justify-content-center'>
        <form className='create-yoga-form' onSubmit={handleCreateYoga}>
          <div className='form-heading'>Create Yoga Class</div>
          <div className='input-wrapper'>
            <div className="form-group custom-datepicker">
              <DatePicker
                className="form-control"
                selected={yogaDate}
                onChange={(date) => setYogaDate(date)}
                dateFormat="dd/MM/yyyy    HH:mm aa"
                placeholderText="Select date and time"
                showTimeSelect
              />
            </div>
          </div>
          <button className='btn btn-warning create-button'>Submit</button>
        </form>
      </div>
      <div className='create-teacher-wrapper d-flex justify-content-center'>
        <form className='create-teacher-form' onSubmit={handleCreateTeacher}>
          <div className='form-heading'>Create Teacher</div>
          <div className='input-wrapper'>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
          </div>
          <div className='input-wrapper'>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className='input-wrapper'>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="teacherPhoneNumber"
                value={teacherPhoneNumber}
                onChange={(e) => setTeacherPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className='input-wrapper'>
            <div className="form-group">
              <label htmlFor="picture">Picture</label>
              <input
                type="text"
                className="form-control"
                id="picture"
                value={teacherPicture}
                onChange={(e) => setTeacherPicture(e.target.value)}
                placeholder="Picture upload functionality will go here"
                readOnly
              />
            </div>
          </div>
          <div className='input-wrapper'>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="form-control"
                id="bio"
                value={teacherBio}
                onChange={(e) => setTeacherBio(e.target.value)}
                placeholder="Enter bio"
                rows="4"
              />
            </div>
          </div>
          <button className='btn btn-warning create-button'>Submit</button>
        </form>
      </div>
      <div className="reservations-wrapper">
        <div className='form-heading-reservations'> Reservations </div>
        <div className="classes-container row">
          {yogaClasses.map(({ _id, day, time, teacher, yogaType }) => (
            <div key={_id} className="class-wrapper">
              <h3>{`${yogaType}: ${day} a las ${time} con ${teacher} `}</h3>
              {reservationsByClass[_id] && reservationsByClass[_id].length > 0 ? (
                <ul className='student-list'>
                  {reservationsByClass[_id].map(({ userName, userID }) => (
                    <li className='single-student' key={userID}>{userName}</li>
                  ))}
                </ul>
              ) : (
                <p>No students enrolled for this class.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

