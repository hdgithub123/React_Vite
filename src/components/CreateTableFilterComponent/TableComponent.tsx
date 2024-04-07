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
      { id: '14', name: 'Liam', age: '33', email: 'liam@example.com' },
      { id: '15', name: 'Olivia', age: '29', email: 'olivia@example.com' },
      { id: '16', name: 'Noah', age: '31', email: 'noah@example.com' },
      { id: '17', name: 'Emma', age: '27', email: 'emma@example.com' },
      { id: '18', name: 'William', age: '35', email: 'william@example.com' },
      { id: '19', name: 'Ava', age: '30', email: 'ava@example.com' },
      { id: '20', name: 'James', age: '32', email: 'james@example.com' },
      { id: '21', name: 'Isabella', age: '28', email: 'isabella@example.com' },
      { id: '22', name: 'Alexander', age: '34', email: 'alexander@example.com' },
      { id: '23', name: 'Mia', age: '26', email: 'mia@example.com' },
    ],
  };


  const [selectedData, setSelectedData] = useState<{ [key: string]: string }[]>([]);
  const [selectedClickRow, setSelectedClickRow] = useState<{ [key: string]: string }>({});

  const handleSelectedRowsChange = (newSelectedRows: { [key: string]: string }[]) => {
    setSelectedData(newSelectedRows);
  };
  const handleClickRowsChange = (newRowSelectedRow: { [key: string]: string }) => {
    setSelectedClickRow(newRowSelectedRow);
  };
  return (
    <div>
      <div>
      <h2>Selected click</h2>
        <ul>
          <li key= {selectedClickRow.id}>
          {selectedClickRow.id} - {selectedClickRow.name} - {selectedClickRow.age} - {selectedClickRow.email}
          </li>

        </ul>
      </div>
      <div>
        <h2>Selected Rows</h2>
        {null || (
          <ul>
            {selectedData.map(row => (
              <li key={row.id}>
                {row.id} - {row.name} - {row.age} - {row.email}
              </li>
            ))}
          </ul>
        )}
      </div>
      <CreateTableFilterComponent Data={tableData} onDataSelected={handleSelectedRowsChange} onRowSelected={handleClickRowsChange} />
    </div>
  );
};

export default TableComponent;
