import React, { useState, useEffect } from 'react';
import {fetchUsers} from './fetches.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Admin.css';

export const Admin = () => {
  const [yogaDate, setYogaDate] = useState(new Date());
  const [classActive, setClassActive] = useState(true);
  const [yogaType, setYogaType] = useState("Hot Yoga");
  const [yogaClasses, setYogaClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [ycTeacherName, setYcTeacherName] = useState('');
  const [users, setUsers] = useState([]);

  const [selectedStudentID, setSelectedStudentID] = useState('');
  const [selectedClassID, setSelectedClassID] = useState('');

  // Teacher State
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState('');
  const [teacherPicture, setTeacherPicture] = useState('');
  const [teacherBio, setTeacherBio] = useState('');
  const [teacherID, setTeacherID] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all yoga classes
        const yogaClassesResponse = await fetch('http://localhost:9000/yogaclass');
        const yogaClassesData = await yogaClassesResponse.json();
        setYogaClasses(yogaClassesData);

        const testApi = await fetchUsers()
        console.log("this is the test api", testApi)

        // Fetch all reservations
        const reservationsResponse = await fetch('http://localhost:9000/reservation');
        const reservationsData = await reservationsResponse.json();
        setReservations(reservationsData);

        // Fetch all teachers
        const teachersResponse = await fetch('http://localhost:9000/teacher');
        const teachersData = await teachersResponse.json();
        console.log('these are the teachers:', teachersData)
        setTeachers(teachersData);

        // Fetch all users
        const usersResponse = await fetch('http://localhost:9000/user');
        const usersData = await usersResponse.json();
        console.log('these are all the users:', usersData)
        setUsers(usersData);

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
          ycTeacherName,
          teacherID,
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

    try {
      const response = await fetch('http://localhost:9000/teacher', {
        method: 'POST',
        body: JSON.stringify({
          name: teacherName,
          email: teacherEmail,
          phoneNumber: teacherPhoneNumber,
          picture: teacherPicture,
          bio: teacherBio,
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Response status ${response.status}`)
      };

      const json = await response.json();
      console.log('this is the teacher data response in JSON:', json)

    } catch (error) {
      console.error(error.message)
    }
  }

  async function makeResAdminHandler(userID, _id) {
    console.log('hit make res in handler')


  }

  async function cancelResAdminHandler(userID, _id) {
    console.log("hit cancel")

    try {

      const response = await fetch('http://localhost:9000/reservation/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userID,
          yogaClassID: _id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status ${response.status}`)
      };

    } catch (error) {
      console.error(error.message)
    }

  };

  async function showResAdminHandler(show) {
    console.log('hit show or no show');
    console.log('this is the show argument', show);
  };

  async function changeResAdminHandler() {
    console.log("hit change res admin handler")
  };

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
          <div className='input-wrapper'>
            <div className="form-group">
              <label htmlFor="teacherSelect">Select Teacher</label>
              <select
                id="teacherSelect"
                className="form-control"
                onChange={(e) => {
                  const selectedTeacher = teachers.find(teacher => teacher._id === e.target.value);
                  setYcTeacherName(selectedTeacher.name);
                  setTeacherID(selectedTeacher._id);
                }}
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
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

      <div className='make-res-admin-wrapper'>
        <form onSubmit={makeResAdminHandler(selectedStudentID, selectedClassID)}>
          <div className="form-group">
            <label htmlFor="studentSelect">Select Student</label>
            <select
              id="studentSelect"
              className="form-control"
              value={selectedStudentID}
              onChange={(e) => setSelectedStudentID(e.target.value)}
            >
              <option value="">Select a student</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="classSelect">Select Yoga Class</label>
            <select
              id="classSelect"
              className="form-control"
              value={selectedClassID}
              onChange={(e) => setSelectedClassID(e.target.value)}
            >
              <option value="">Select a yoga class</option>
              {yogaClasses.map((yogaClass) => (
                <option key={yogaClass._id} value={yogaClass._id}>
                  {`${yogaClass.day} at ${yogaClass.time}`}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Create Reservation
          </button>
        </form>
      </div>


      <div className="reservations-wrapper">
        <div className='form-heading-reservations'> Reservations </div>
        <div className="classes-container row">
          {yogaClasses.map(({ _id, day, time, ycTeacherName, yogaType }) => (
            <div key={_id} className="class-wrapper">
              <h3 className='admin-class-title'>{`${yogaType}: ${day} a las ${time} con ${ycTeacherName}`}</h3>
              {reservationsByClass[_id] && reservationsByClass[_id].length > 0 ? (
                <ul className='student-list'>
                  {reservationsByClass[_id].map(({ userName, userID }) => (
                    <li className='single-student d-flex justify-content-between align-items-center' key={userID}>
                      {userName}
                      <div className='admin-actions'>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => cancelResAdminHandler(userID, _id)}
                        >
                          Cancel
                        </button>
                        <button
                          className='btn btn-success btn-sm mx-1'
                          onClick={() => showResAdminHandler(userID, _id, 'show')}
                        >
                          Show
                        </button>
                        <button
                          className='btn btn-secondary btn-sm mx-1'
                          onClick={() => showResAdminHandler(userID, _id, 'no-show')}
                        >
                          No Show
                        </button>
                        <select
                          className='form-select form-select-sm'
                          onChange={(e) => changeResAdminHandler(userID, _id, e.target.value)}
                        >
                          <option value="">Switch Reservation</option>
                          {yogaClasses.filter(yogaClass => yogaClass._id !== _id).map(({ _id: newClassID, day: newDay, time: newTime }) => (
                            <option key={newClassID} value={newClassID}>
                              {`${newDay} at ${newTime}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
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

