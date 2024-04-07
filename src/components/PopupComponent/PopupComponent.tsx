import React, { useState } from 'react';

const PopupComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  

  const textchangePopup = () => {
    setShowPopup(true);
  };

  return (
    <div>
      <input onChange={textchangePopup}></input>
      <button onClick={togglePopup}>Click me</button>
      {showPopup && (
        <div className="popup">
          <p>This is a popup content</p>
          <p>This is a popup content</p>
          <p>This is a popup content</p>
          
          <p>This is a popup content</p>
          <p>This is a popup content</p>
          <p>This is a popup content</p>
          <p>This is a popup content</p>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
