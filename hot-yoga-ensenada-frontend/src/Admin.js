import React, {useState, useEffect} from 'react';
import './Admin.css';

export const Admin = () => {

  const [yogaDate, setYogaDate] = useState('');
  const [yogaDay, setYogaDay] = useState('');
  const [yogaTime, setYogaTime] = useState('');
  const [classActive, setClassActive] = useState(true);

  const handleCreateYoga = (event) => {
    event.preventDefault();
    console.log("hit create handler")
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
  }, [yogaDate] )


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
              <input type='text' placeholder='Date' value={yogaDate} onChange={(e) => setYogaDate(e.target.value)} />
            </div>
            <div className="form-group">
              <input type='text' placeholder='Day' value={yogaDay} onChange={(e) => setYogaDay(e.target.value)} />
            </div>
            <div className="form-group">
              <input type='text' placeholder='Time' value={yogaTime} onChange={(e) => setYogaTime(e.target.value)} />
            </div>
          </div>
          <button className='btn btn-warning create-button'> submit </button>
        </form>
      </div>
    </div>
  )
}