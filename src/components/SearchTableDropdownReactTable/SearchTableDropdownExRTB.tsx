import React, { useState } from 'react';
import ReactTable from './ReactTable'; // Import ReactTable component
import DataTable from './DataTable'; // Import ReactTable component

const SearchTableDropdownExRTB = () => {
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
    // ... other data entries ...
    { id: 12, name: 'Kate', age: 75, email: 'kate@example.com', address: '777 Oak St' },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data}></DataTable>
      <h1>Example Table</h1>
      <ReactTable columns={columns} data={data} onRowSelect={handleRowSelect} />
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

export default SearchTableDropdownExRTB;
