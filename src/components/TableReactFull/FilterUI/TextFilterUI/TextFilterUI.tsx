import { useState } from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

function TextFilterUI({ column }: { column: Column<any, unknown> }) {
    const [searchText, setSearchText] = useState('');
    const [filterOption, setFilterOption] = useState<'contains' | 'notContains' | 'startsWith'>('contains');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      console.log( searchText);
      return false;
      // applyFilter();
    };
  
    const handleOptionChange = (option: 'contains' | 'notContains' | 'startsWith') => {
      setFilterOption(option);
      console.log( option);
      return false;
      // applyFilter();
    };
  
    const applyFilter = () => {
      const filterFn = (row, columnId, filterValue, addMeta) => {
        const cellValue = row.values[columnId];
        let isMatched = false;
        
        if (filterOption === 'contains') {
          isMatched = cellValue.includes(searchText);
        } else if (filterOption === 'notContains') {
          isMatched = !cellValue.includes(searchText);
        } else if (filterOption === 'startsWith') {
          isMatched = cellValue.startsWith(searchText);
        }
  
        addMeta({ isMatched }); // Add meta information for styling
        return isMatched;
      };
  
      column.setFilterValue({ searchText, filterOption });
      // column.setFilterFn(filterFn);
      column.setFilterValue
    };
  
    return (
      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Searchabc..."
        />
        <select value={filterOption} onChange={(e) => handleOptionChange(e.target.value as 'contains' | 'notContains' | 'startsWith')}>
          <option value="contains">Contains</option>
          <option value="notContains">Does not contain</option>
          <option value="startsWith">Starts with</option>
        </select>
      </div>
    );
  }
  
  export default TextFilterUI;