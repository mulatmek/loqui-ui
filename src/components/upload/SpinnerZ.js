
import './SpinnerZ.css';
import React from 'react';
import { Oval  } from 'react-loader-spinner';


function SpinnerZ() {
  return (
    <div className='spinner-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className="file-type">Loading ...</p>
      <Oval 
        height="40"
        width="70"
        radius="9"
        color="blue"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}

export default SpinnerZ;
