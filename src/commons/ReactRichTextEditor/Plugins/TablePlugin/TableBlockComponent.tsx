import React, { forwardRef, useRef, useState } from 'react';

const TableBlockComponent = ({ block, contentState, onInput }) => {
    const entityKey = block.getEntityAt(0);
    const { data } = contentState.getEntity(entityKey).getData();
  
    const handleInput = (rowIndex, colKey, newValue) => {
      const newData = [...data];
      newData[rowIndex][colKey] = newValue;
  
      const blockTableInfo = {
        entityKey,
        data: newData,
      };
  
      if (onInput) {
        onInput(blockTableInfo);
      }
      console.log("blockTableInfo",blockTableInfo)
    };
  
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((colKey, colIndex) => (
                <td
                  key={colIndex}
                  contentEditable
                  suppressContentEditableWarning
                  // onInput={(e) => handleInput(rowIndex, colKey, e.target.innerText)}
                  onInput={(e) => handleInput(rowIndex, colKey, "e.target.innerText")}
                >
                  {row[colKey] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
export default TableBlockComponent;