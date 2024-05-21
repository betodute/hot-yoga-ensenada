import './Headline.css';
import homeImageOne from './images/original.png'

export const Headline = () => {
  return (
    <div className='headline-wrapper'>
      <h2 className="headline">Hot Yoga Ensenada</h2>
      <div className='image-wrapper text-center'>
          <img className="home-image mx-auto d-block" src={homeImageOne}></img>
        </div>
    </div>
  )
}