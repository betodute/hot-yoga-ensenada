import { Headline } from './Headline'
import { Reservation } from './Reservation'
import { Profile } from './Profile'
import homeImageOne from './images/original.png'
import './Home.css'

export const Home = () => {
 
  return(
    <div className='container'>
      <div className='row'>
        <Headline className='col-12'/>
        <div className='image-wrapper text-center'>
          <img className="home-image mx-auto d-block" src={homeImageOne}></img>
        </div>
        <Profile />
        <Reservation today={new Date().getDay()} time={new Date().getHours()} className='col-12'/>
      </div>
    </div>
  );

};