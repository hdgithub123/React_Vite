import React from 'react';
import SearchBox from './SeachboxComponent';

const CheckSearchBox: React.FC = () => {
  const title = {
    id: 'ID',
    name: 'Name',
    age: 'Age',
    email: 'Email',
  };

  const searchKeys = ['name', 'email'];

  const data = [
    { id: 1, name: 'John', age: '30', email: 'john@example.com' },
    { id: 2, name: 'Alice', age: '25', email: 'alice@example.com' },
    { id: 3, name: 'Bob', age: '35', email: 'bob@example.com' },
    { id: 4, name: 'Tom', age: '28', email: 'tom@example.com' },
    { id: 5, name: 'Emma', age: '32', email: 'emma@example.com' },
  ];

  return (
    <div>
      <h1>Search Example</h1>
      <SearchBox title={title} searchKeys={searchKeys} data={data} />
    </div>
  );
};

export default CheckSearchBox;
