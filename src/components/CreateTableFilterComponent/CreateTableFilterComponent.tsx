import React, { useState, useEffect } from 'react';
import './CreateTableFilterComponent.css';

interface TableData {
  title: { [key: string]: string };
  Datainsert: { [key: string]: string }[];
}

interface Props {
  Data: TableData;
  selectedRows: string[];
  onRowSelect: (id: string) => void;
}

const CreateTableFilterComponent: React.FC<Props> = ({ Data, selectedRows, onRowSelect }) => {
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
  }, [Datainsert, selectedRows]);

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
    onRowSelect(id);
  };

  const filteredData = Datainsert.filter(row => {
    return Object.keys(filterValues).every(key => {
      const filterText = filterValues[key]?.toLowerCase(); // Chuyển đổi filter text thành chữ thường
      const rowValue = row[key]?.toLowerCase() || null; // Lấy giá trị của hàng và chuyển đổi thành chữ thường, nếu không có giá trị thì gán null
      return rowValue?.includes(filterText) || filterText === ''; // Kiểm tra xem giá trị của hàng chứa filter text hoặc filter text là chuỗi rỗng
    });
  });
  
  const handleAllCheckboxFilterChange = () => {
    const isCheckedAll = !allFilterCheck;
    const newCheckboxStates: { [key: string]: boolean } = {};
    filteredData.forEach(row => {
      newCheckboxStates[row.id] = isCheckedAll;
     // onRowSelect(row.id);
     //handleCheckboxChange(row.id)
    });
    setCheckboxStates(prevCheckboxStates => {
        const updatedCheckboxStates = { ...prevCheckboxStates };
        filteredData.forEach(row => {
          updatedCheckboxStates[row.id] = isCheckedAll;
        });
        return updatedCheckboxStates;
      });
  
  };
  
  

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
                onClick={handleAllCheckboxFilterChange}
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
