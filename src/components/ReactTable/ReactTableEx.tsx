import React, { useState } from 'react';
import ReactTable from './ReactTable'; // Import ReactTable component
import ReactTableCheckbox from './ReactTableCheckbox'; // Import ReactTable component

const ReactTableEx = () => {
  const [selectedData, setSelectedData] = useState(null); // State to store the selected data from the table

  // Event handler when selecting a row in the table
  const handleRowSelect = (rowData) => {
    setSelectedData(rowData); // Update state with the selected row data
  };

  // Sample data and column structure
  const columns = [
    {
      Header: 'Mã',
      accessor: 'id',
      resizable: true,
    },
    {
      Header: 'Name',
      accessor: 'name',
      resizable: true,
    },
    {
      Header: 'Age',
      accessor: 'age',
      resizable: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      resizable: true,
    },
    {
      Header: 'Address', // Corrected typo: 'Adress' to 'Address'
      accessor: 'address',
      resizable: true,
    },
  ];

  // Sample data (without duplicates)
  const data = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com', address: '123 Main St' },
    { id: 9, name: 'Henry', age: 60, email: 'henry@example.com', address: '444 Spruce St' },
    { id: 10, name: 'Ivy', age: 65, email: 'ivy@example.com', address: '555 Birch St' },
    { id: 9, name: 'Henry', age: 60, email: 'henry@example.com', address: '444 Spruce St' },
    { id: 10, name: 'Ivy', age: 65, email: 'ivy@example.com', address: '555 Birch St' },
    { id: 11, name: 'Jack', age: 70, email: 'jack@example.com', address: '666 Pine St' },
    { id: 12, name: 'Kate', age: 75, email: 'kate@example.com', address: '777 Oak St' },
    { id: 2, name: 'Alice', age: 25, email: 'alice@example.com', address: '123 Main St' },
    { id: 3, name: 'Bob', age: 30, email: 'bob@example.com', address: '456 Elm St' },
    { id: 4, name: 'Charlie', age: 35, email: 'charlie@example.com', address: '789 Oak St' },
    { id: 5, name: 'David', age: 40, email: 'david@example.com', address: '101 Maple St' },
    { id: 6, name: 'Eva', age: 45, email: 'eva@example.com', address: '111 Pine St' },
    { id: 7, name: 'Frank', age: 50, email: 'frank@example.com', address: '222 Cedar St' },
    { id: 8, name: 'Grace', age: 55, email: 'grace@example.com', address: '333 Walnut St' },
    { id: 9, name: 'Henry', age: 60, email: 'henry@example.com', address: '444 Spruce St' },
    { id: 10, name: 'Ivy', age: 65, email: 'ivy@example.com', address: '555 Birch St' },
    { id: 11, name: 'Jack', age: 70, email: 'jack@example.com', address: '666 Pine St' },
    { id: 12, name: 'Kate', age: 75, email: 'kate@example.com', address: '777 Oak St' }
  ];

  return (
    <div>
      <h1>Example Table</h1>
      <ReactTable columns={columns} data={data} onRowSelect={handleRowSelect} />
      {/* <ReactTableCheckbox columns={columns} data={data} onRowSelect={handleRowSelect} /> */}
      {selectedData && (
        <div>
          <h2>Selected Data</h2>
          <p>ID: {selectedData.id}</p>
          <p>Name: {selectedData.name}</p>
          <p>Age: {selectedData.age}</p>
          <p>Email: {selectedData.email}</p>
          <p>Address: {selectedData.address}</p>
        </div>
      )}
    </div>
  );
};

export default ReactTableEx;
