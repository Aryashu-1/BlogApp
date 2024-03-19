import React from 'react';
import { useLocation } from 'react-router-dom';
function Readarticle() {
    const location = useLocation();
    const {state} = location.state;
  return (
    <div>
        <h1>
            {state}
        </h1>
    </div>
  )
}

export default Readarticle