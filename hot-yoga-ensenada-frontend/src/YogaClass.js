import './YogaClass.css'

export const YogaClass = (props) => {

  return(
    <div className='single-class'>
      <label> {props.singleClass.day} {props.singleClass.time} </label>
      <button type='button' className='btn btn-warning m-2'> Reservar </button>
    </div>
  )

};