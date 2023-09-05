import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function StartScreen() {
  return (
  <div> 
    <div className='center'>
    <Link to={`/home`}>
    <Button id='center-button' type='submit' variant='black'>Welcome!</Button>
    </Link>
    </div>
    <div className="background-video">
      <video autoPlay loop muted>
        <source src="../images/TV.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {/* Il tuo contenuto principale */}
      </div>
    </div>
    </div>
  )
}

export default StartScreen