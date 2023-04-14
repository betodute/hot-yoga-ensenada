import './YogaClass.css'
import { useEffect, useState } from 'react'

export const YogaClass = (props) => {
  
  let [apiList, setApiList] = useState([]);

  const handleRegisterClick = (event) => {
    let sampleUserID = '010101'
    let parentDivID = event.currentTarget.parentNode.id;
    console.log('User ID =', sampleUserID, "Class ID =", parentDivID)
  }


  // LATER - ONLY SEARCH "ACTIVE" CLASSES IN THE API! MAKE ACTIVE AN ATTRIBUTE WITH A BOOLEAN VALUE
  // THIS WAY THERE ARE ONLY 5 ACTIVE CLASSES THAT GET CALLED HERE EACH TIME
 
  useEffect(() => {
    fetch('http://localhost:9000/yogaclass')
      .then(response => response.json())
      .then(data => setApiList(data))
      .catch(error => console.log(error));
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
