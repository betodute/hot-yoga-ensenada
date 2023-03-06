import { Headline } from './Headline';
import { Quote } from './Quote'
import { Reservation } from './Reservation'
import './Home.css'

export const Home = () => {
  return(
    <div className='container-fluid'>
      <div className='row'>
        <Headline className='col-12'/>
        <Quote className='col-12'/>
        <Reservation className='col-12'/>
      </div>
    </div>
  )
};