import './YogaClass.css'
import {useState, useEffect} from 'react'

export const YogaClass = (props) => {

  const [classDB, setClassDB] = useState([]);

    useEffect(() => {
      fetch('http://localhost:9000/yogaclasses', {
        method: 'POST',
        body: JSON.stringify({date: props.singleClass.calDate, day: props.singleClass.day, time: props.singleClass.time, }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
    }, [props.id])

  return(
    <div className='single-class'>
      <label> {props.singleClass.day} {props.singleClass.time} </label>
      <button type='button' className='btn btn-warning m-2'> Reservar </button>
    </div>
  )
};