import React, { useState } from 'react';
import CreateTableFilterComponent from './CreateTableFilterComponent';

const TableComponent: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Dữ liệu mẫu
  const tableData = {
    title: {
      id: 'Mã',
      name: 'Họ Và Tên',
      age: 'Tuổi',
      email: 'Email',
    },
    Datainsert: [
      { id: '1', age: '30', email: 'john@example.com' },
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
      { id: '14', name: 'Alexander', age: '33', email: 'alexander@example.com' }
    ],
  };

  const handleRowSelect = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const filteredData = tableData.Datainsert.filter(row => selectedRows.includes(row.id));

  return (
    <div>
      <div>
        <h2>Selected Rows</h2>
        <ul>
          {filteredData.map(row => (
            <li key={row.id}>
              {row.id} - {row.name} - {row.age} - {row.email}
            </li>
          ))}
        </ul>
      </div>
      <p>Table Example</p>
      <CreateTableFilterComponent Data={tableData} selectedRows={selectedRows} onRowSelect={handleRowSelect} />
      
    </div>
  );
};

export default TableComponent;