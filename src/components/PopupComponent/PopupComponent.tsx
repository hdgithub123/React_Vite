import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupComponent: React.FC = () => {
  return (
    <Popup trigger={<input></input>} position="bottom left">
      <div>Popup content here !!</div>
      <div>Popup content here !!</div>
      <div>Popup content here !!</div>
      <div>Popup content here !!</div>
      <div>Popup content here !!</div>
      <div>Popup content here !!</div>
      <div>Popup content here !!</div>
    </Popup>
  );
};

export default PopupComponent;
