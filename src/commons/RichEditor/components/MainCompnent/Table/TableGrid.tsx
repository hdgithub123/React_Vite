import React, { useState } from 'react';

const TableGrid = ({ handleSubmit, maxGridSize = 8 }) => {
  const [size, setSize] = useState({ cols: 0, rows: 0 });

  const grid = Array.from({ length: maxGridSize }, () => Array(maxGridSize).fill(1));

  const handleHover = (i, j) => {
    setSize({ cols: j + 1, rows: i + 1 });
  };

  const handleSelect = () => {
    handleSubmit(size);
  };

  const cellStyle = (isSelected) => ({
    width: 15,
    height: 15,
    margin: 1,
    display: 'inline-block',
    background: isSelected ? 'rgba(0, 125, 250, 0.4)' : 'rgba(200, 200, 200, 0.4)',
    border: isSelected ? '1px solid rgba(0, 125, 250, 0.8)' : '1px solid rgba(150, 150, 150, 1)',
    cursor: 'pointer',
  });

  return (
    <div>
      <div style={{ margin: '10px 10px 5px' }}>
        {grid.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((_, j) => {
              const isSelected = i < size.rows && j < size.cols;
              return (
                <div
                  key={`${i}-${j}`}
                  style={cellStyle(isSelected)}
                  onMouseEnter={() => handleHover(i, j)}
                  onClick={handleSelect}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ margin: 10, fontSize: 12 }}>
        Insert table size: {size.cols} x {size.rows}
      </div>
    </div>
  );
};

export default TableGrid;
