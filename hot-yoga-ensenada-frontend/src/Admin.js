import React, { useState, useEffect } from 'react';
import './Admin.css';

export const Admin = () => {

  const [yogaDate, setYogaDate] = useState('');
  const [yogaDay, setYogaDay] = useState('');
  const [yogaTime, setYogaTime] = useState('');
  const [classActive, setClassActive] = useState(true);

  async function handleCreateYoga (event) {
    event.preventDefault();
    console.log("hit create handler")
    
    // Make the YogaClass fetch request here with all data. 

    try {

      const response = await fetch('http://localhost:9000/yogaclass', {
        method: 'POST',
        body: JSON.stringify({ yogaDate, yogaDay, yogaTime, classActive }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        throw new Error(`Response status ${response.status}`)
      }

      const json = await response.json();
      console.log("this is the data response in json", json);

    } catch (error) {

      console.error(error.message)

    }
    

  }

  useEffect(() => {
    if (classActive) {
      console.log('this is the date');
      console.log(yogaDate)
      console.log('this is day');
      console.log(yogaDay);
      console.log('this is time');
      console.log(yogaTime);

    }
  }, [yogaDate, yogaDay, yogaTime])


  return (
    <div className='admin-wrapper'>
      <div className='admin-heading'>
        <h2> Admin </h2>
      </div>
      <div className='create-yoga-wrapper'>
        <form className='create-yoga-form' onSubmit={handleCreateYoga}>
          <div className='form-heading'> Create Yoga Class </div>
          <div className='input-wrapper'>
            <div className="form-group">
              <input type='date' placeholder='Date' value={yogaDate} onChange={(e) => setYogaDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className='dia-semana' htmlFor="dropdown">Día:</label>
              <select 
                id="dropdown" 
                name="dropdown" 
                value={yogaDay} 
                onChange={(e) => setYogaDay(e.target.value)}
              >
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miercoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sabado">Sábado</option>
              </select>
            </div>
            <div className="form-group">
              <input type='time' placeholder='12:00' value={yogaTime} onChange={(e) => setYogaTime(e.target.value)} />
            </div>
          </div>
          <button className='btn btn-warning create-button'> submit </button>
        </form>
      </div>
    </div>
  )
}