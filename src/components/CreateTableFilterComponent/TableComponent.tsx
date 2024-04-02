// TableComponent.tsx
import React, { useState } from 'react';
import CreateTableFilterComponent from './CreateTableFilterComponent';

const TableComponent: React.FC = () => {
  

  const tableData = {
    title: {
      id: 'Mã',
      name: 'Họ Và Tên',
      age: 'Tuổi',
      email: 'Email',
    },
    Datainsert: [
      { id: '1', name: 'John', age: '30', email: 'john@example.com' },
      { id: '2', name: 'Alice', age: '25', email: 'alice@example.com' },
      { id: '3', name: 'Bob', age: '35', email: 'bob@example.com' },
      { id: '4', name: 'Tom', age: '28', email: 'tom@example.com' },
      { id: '5', name: 'Emma', age: '32', email: 'emma@example.com' },
      { id: '6', name: 'Michael', age: '33', email: 'michael@example.com' },
      { id: '7', name: 'Jessica', age: '29', email: 'jessica@example.com' },
      { id: '8', name: 'William', age: '31', email: 'william@example.com' },
      { id: '9', name: 'Olivia', age: '27', email: 'olivia@example.com' },
      { id: '10', name: 'James', age: '34', email: 'james@example.com' },
      { id: '11', name: 'Elizabeth', age: '26', email: 'elizabeth@example.com' },
      { id: '12', name: 'Daniel', age: '30', email: 'daniel@example.com' },
      { id: '13', name: 'Sophia', age: '28', email: 'sophia@example.com' },
    ],
  };

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectedRowsChange = (newSelectedRows: string[]) => {
    setSelectedRows(newSelectedRows);
    console.log("selectedRows",selectedRows)
  };


  return (
    <div>
      
      <div>
        <h2>Selected Rows</h2>
        <ul>
          {selectedRows.map(id => (
            <li key={id}>
              {tableData.Datainsert.find(row => row.id === id)?.id} - {tableData.Datainsert.find(row => row.id === id)?.name} - {tableData.Datainsert.find(row => row.id === id)?.age} - {tableData.Datainsert.find(row => row.id === id)?.email}
            </li>
          ))}
        </ul>
      </div>
      <CreateTableFilterComponent Data={tableData} selectedRows={selectedRows} onSelectedRowsChange={handleSelectedRowsChange} />
    </div>
  );
};

export default TableComponent;
