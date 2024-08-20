import './YogaClass.css';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "./UserContext.js";


export const YogaClass = ({ title, onReserve, reserved, yogaIdForReserve }) => {

  const { user } = useContext(UserContext);

  return (
    <div className='single-class col-12'>
      <div className={`${title.toLowerCase().replace(' ', '-')}-title`}>{title}</div>
      <button
        className={`${title.toLowerCase().replace(' ', '-')}-button btn btn-warning`}
        onClick={onReserve}
      >
        {reserved ? 'cancelar' : 'reservar'}
      </button>
      <p> </p>
    </div>
  );
};




