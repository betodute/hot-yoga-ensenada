import './YogaClass.css'
import { useEffect, useState } from 'react'
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const YogaClass = (props) => {

  const { user } = useContext(UserContext);
  
  let [apiList, setApiList] = useState([]);

  const handleRegisterClick = (event) => {
    let userID = user._id
    let yogaClassID = event.currentTarget.parentNode.id;

    fetch('http://localhost:9000/reservation', {
      method: 'POST',
      body: JSON.stringify({"userID": userID, "yogaClassID": yogaClassID}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    }); 
  }
 
  useEffect(() => {
    const postClasses = async () => {
      const postClasses = await fetch('http://localhost:9000/yogaclass', {
        method: 'POST',
        body: JSON.stringify({date: props.singleClass.caldate, day: props.singleClass.day, time: props.singleClass.time}),
        headers: { 'Content-Type': 'application/json' }})
      const json1 = await postClasses.json();
    }
    const getClasses = async () => {
      const getClasses = await fetch('http://localhost:9000/yogaclass')
      const json2 = await getClasses.json();
      setApiList(json2);
    }
    postClasses();
    getClasses();
  }, [])

  const matchingAPI = apiList.find(singleAPI => singleAPI.day === props.singleClass.day && singleAPI.time === props.singleClass.time);

  if (matchingAPI) {
    return (
      <div id={matchingAPI['_id']} className='single-class'>
        <label> {props.singleClass.day} {props.singleClass.time} </label>
        <button type='button' className='btn btn-warning m-2' onClick={handleRegisterClick}> Reservar </button>
      </div>
    );
  };
};
