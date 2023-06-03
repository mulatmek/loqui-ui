import Spinner from 'react-bootstrap/Spinner';
import './SpinnerZ.css';
import React from 'react';

function SpinnerZ() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className="file-type">loqui AI model loading ...</p>
      <Spinner animation="border" role="status">
        
      </Spinner>
    </div>
  );
}

export default SpinnerZ;
