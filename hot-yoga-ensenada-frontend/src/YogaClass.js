import './YogaClass.css'
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const YogaClass = (props) => {

  const { user } = useContext(UserContext);

  const handleRegisterClick = (event) => {

    let userID = user._id
    let yogaClassID = props.singleClass._id;

    fetch('http://localhost:9000/reservation', {
      method: 'POST',
      body: JSON.stringify({"userID": userID, "yogaClassID": yogaClassID}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
    alert(`${props.singleClass.day} a las ${props.singleClass.time} Reservado: OMG`) 
  }
 
  return (
    <div className='single-class'>
      <label> {props.singleClass.day} {props.singleClass.time} </label>
      <button type='button' className='btn btn-warning m-2' onClick={handleRegisterClick}> Reservar </button>
    </div>
  );
};
