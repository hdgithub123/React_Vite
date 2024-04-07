import React, { useState } from 'react';

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {selectedOption && (
        <div className="dropdown-content">
          <p>Selected option: {selectedOption}</p>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
