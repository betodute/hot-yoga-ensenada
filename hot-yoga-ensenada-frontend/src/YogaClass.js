import './YogaClass.css';
import React, { useContext } from 'react';
import { UserContext } from "./UserContext.js";

export const YogaClass = ({ title, onReserve, reserved}) => {

  // Determine the button class based on the reserved status
  const buttonClass = reserved ? 'btn btn-danger' : 'btn btn-warning';

  return (
    <div className='single-class col-12'>
      <div className={`${title.toLowerCase().replace(' ', '-')}-title`}>{title}</div>
      <button
        className={`${title.toLowerCase().replace(' ', '-')}-button ${buttonClass}`}
        onClick={() => onReserve()}
      >
        {reserved ? 'cancelar' : 'reservar'}
      </button>
      <p> </p>
    </div>
  );
};





