// CreateTableFilterComponent.tsx
import React, { useState, useEffect } from 'react';
import './CreateTableFilterComponent.css';

interface TableData {
  title: { [key: string]: string };
  Datainsert: { [key: string]: string }[];
}

interface Props {
  Data: TableData;
  selectedRows: string[];
  onSelectedRowsChange: (selectedRows: string[]) => void;
}

const CreateTableFilterComponent: React.FC<Props> = ({ Data, selectedRows, onSelectedRowsChange }) => {
  const { title, Datainsert } = Data;
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize checkbox states when data changes
    const initialCheckboxStates: { [key: string]: boolean } = {};
    Datainsert.forEach(row => {
      initialCheckboxStates[row.id] = selectedRows.includes(row.id);
    });
    setCheckboxStates(initialCheckboxStates);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
    const { value } = e.target;
    setFilterValues(prevState => ({
      ...prevState,
      [columnName]: value
    }));
  };

  const handleCheckboxChange = (id: string) => {
    const updatedCheckboxStates = { ...checkboxStates, [id]: !checkboxStates[id] };
    setCheckboxStates(updatedCheckboxStates);
    const updatedSelectedRows = Object.keys(updatedCheckboxStates).filter(id => updatedCheckboxStates[id]);
    onSelectedRowsChange(updatedSelectedRows);
  };

  const handleAllCheckboxFilterChange = () => {
    const isCheckedAll = !allFilterCheck;
    const newCheckboxStates: { [key: string]: boolean } = {};
    const updatedSelectedRows: string[] = [];
    filteredData.forEach(row => {
      newCheckboxStates[row.id] = isCheckedAll;
      if (isCheckedAll) {
        updatedSelectedRows.push(row.id);
      }
    });
    setCheckboxStates(newCheckboxStates);
    onSelectedRowsChange(updatedSelectedRows);
  };

  const filteredData = Datainsert.filter(row => {
    return Object.keys(filterValues).every(key => {
      const filterText = filterValues[key]?.toLowerCase(); 
      const rowValue = row[key]?.toLowerCase() || null; 
      return rowValue?.includes(filterText) || filterText === '';
    });
  });

  const allFilterCheck = filteredData.length > 0 && filteredData.every(row => checkboxStates[row.id]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            {Object.keys(title).map((key, index) => (
              <th key={index}>
                <input
                  type="text"
                  value={filterValues[key] || ''}
                  onChange={(e) => handleFilterChange(e, key)}
                  placeholder={`Filter ${title[key]}`}
                />
              </th>
            ))}
          </tr>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allFilterCheck}
                onChange={handleAllCheckboxFilterChange}
              />
            </th>
            {Object.keys(title).map((key, index) => (
              <th key={index}>
                {title[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates[rowData.id]}
                  onChange={() => handleCheckboxChange(rowData.id)}
                />
              </td>
              {Object.keys(title).map((key, index) => (
                <td key={index}>{rowData[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateTableFilterComponent;
