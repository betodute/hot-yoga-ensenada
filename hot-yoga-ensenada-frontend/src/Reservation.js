import './Reservation.css'
import { YogaClass } from './YogaClass'
import { useState } from 'react';

export const Reservation = (props) => {

  const [yogaClasses, setYogaClasses] = useState([
    { day: "Martes ", time: "7am", caldate: "01/01/2023" },
    { day: "Martes ", time: "6pm", caldate: "01/01/2023" },
    { day: "Jueves ", time: "7am", caldate: "01/01/2023" },
    { day: "Jueves ", time: "6pm", caldate: "01/01/2023" },
    { day: "Sábado ", time: "4pm", caldate: "01/01/2023" },
  ]);
  
  const groupedClasses = yogaClasses.reduce((acc, yogaClass) => {
    if (!acc[yogaClass.day]) {
      acc[yogaClass.day] = [];
    }
    acc[yogaClass.day].push(yogaClass);
    return acc;
  }, {});

  return (
    <div className="reservation-wrapper">
      <form>
        {Object.entries(groupedClasses).map(([day, classes]) => (
          <div key={day} className="form-row">
            {classes.map((yogaClass) => (
              <YogaClass
                key={yogaClass.time}
                singleClass={yogaClass}
                disable={
                  props.today >= yogaClass.dayOfWeek &&
                  (props.today > yogaClass.dayOfWeek ||
                    props.time >= yogaClass.time)
                }
              />
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};