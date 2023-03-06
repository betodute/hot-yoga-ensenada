import { Schedule } from './Schedule';
import { Quote } from './Quote'
import './Home.css'

export const Home = () => {
  return(
    <div className='home-wrapper'>
      <Schedule/>
      <Quote />
    </div>
  )
};