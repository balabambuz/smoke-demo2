import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/blackScreen.css';

const BlackTransition = ({ location }) => {
  const [showSpots, setShowSpots] = useState(false);

  useEffect(() => {
    setShowSpots(true);

    const timeout = setTimeout(() => {
      setShowSpots(false);
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="black-screen">
      {showSpots && <div className="black-screen-spots"></div>}
    </div>
  );
}

export default withRouter(BlackTransition);