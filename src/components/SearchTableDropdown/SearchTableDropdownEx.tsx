
import SearchTableDropdown from './SearchTableDropdown';

const SearchTableDropdownEx = () => {
  const data = [
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
  

  const columnDisplay = {name:'ten', age: 'tuoi',address: "Địa chỉ", email: 'email'}; // Tên các cột sẽ hiển thị
  const columnSearch = ['name', 'email']; // Các cột được tìm kiếm

  return (
    <div>
      <h1>Search Component Example</h1>
      <SearchTableDropdown
       data={data}
       columnDisplay={columnDisplay}
       columnSearch={columnSearch}
       displayValue="email" // chọn key muốn hiển thị
      />
    </div>
  );
};

export default SearchTableDropdownEx;

