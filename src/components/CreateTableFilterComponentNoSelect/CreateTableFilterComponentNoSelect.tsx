// CreateTableFilterComponent.tsx
import React, { useState, useEffect } from 'react';
import './CreateTableFilterComponentNoSelect.css';

interface TableData {
  title: { [key: string]: string };
  Contents: { [key: string]: string }[];
}

interface Props {
  Data: TableData;
  onRowSelected: (selectedRoeData: { [key: string]: string }) => void;
}

const CreateTableFilterComponentNoSelect: React.FC<Props> = ({ Data, onRowSelected }) => {
  const { title, Contents } = Data;
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [filterStates, setfilterStates] = useState<{ [key: string]: string }[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const filterDatas = (data: { [key: string]: string }[], filterValues: { [key: string]: string }) => {
    return data.filter(row => {
      return Object.keys(filterValues).every(key => {
        const filterText = filterValues[key]?.toLowerCase();
        const rowValue = row[key]?.toLowerCase() || null;
        return rowValue?.includes(filterText) || filterText === '';
      });
    });
  };

  
  useEffect(() => {
    setfilterStates(filterDatas(Contents, filterValues))
  }, [filterValues]);



  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
    const { value } = e.target;
    setFilterValues(prevState => ({
      ...prevState,
      [columnName]: value
    }));
  };


  const handleSelectRowClick = (rowData: { [key: string]: string }) => {
    setSelectedRow(rowData.id);
    onRowSelected(rowData);
  };


  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Object.keys(title).map((key, index) => (
              <th key={index}>
                <input
                  type="text"
                  value={filterValues[key] || ""}
                  onChange={(e) => handleFilterChange(e, key)}
                  placeholder={`Filter ${title[key]}`}
                />
              </th>
            ))}
          </tr>
          <tr>
            {Object.keys(title).map((key, index) => (
              <th key={index}>
                {title[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterStates.map((rowData, rowIndex) => (
            <tr key={rowIndex} onClick={()=> handleSelectRowClick(rowData)} className={rowData.id === selectedRow ? 'selected-row' : ''} >
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

export default CreateTableFilterComponentNoSelect;
