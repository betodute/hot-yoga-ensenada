import React from 'react';
import './YogaClass.css';

export const YogaClass = ({ title, onReserve, reserved }) => {
  return (
    <div className='single-class col-12'>
      <div className={`${title.toLowerCase().replace(' ', '-')}-title`}>{title}</div>
      <button
        className={`${title.toLowerCase().replace(' ', '-')}-button btn btn-warning`}
        onClick={onReserve}
      >
        {reserved ? 'cancelar' : 'reservar'}
      </button>
    </div>
  );
};




