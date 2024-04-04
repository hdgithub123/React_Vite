// CreateTableFilterComponent.tsx
import React, { useState, useEffect, useRef } from 'react';
import './CreateTableFilterComponent.css';

interface TableData {
  title: { [key: string]: string };
  Datainsert: { [key: string]: string }[];
}

interface Props {
  Data: TableData;
  onDataSelected: (selectedData:{ [key: string]: string }[]) => void;
}

const CreateTableFilterComponent: React.FC<Props> = ({Data , onDataSelected }) => {
  const { title, Datainsert } = Data;
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});
  const [filterStates, setfilterStates] = useState<{[key: string]: string }[]>([]);
  const [checkallboxStates, setCheckallboxStates] = useState<boolean>(false);
  const [itemCheck, setitemCheck] = useState<string>("A");

  const filterDatas = (data: { [key: string]: string }[], filterValues: { [key: string]: string }) => {
    return data.filter(row => {
      return Object.keys(filterValues).every(key => {
        const filterText = filterValues[key]?.toLowerCase(); 
        const rowValue = row[key]?.toLowerCase() || null; 
        return rowValue?.includes(filterText) || filterText === '';
      });
    });
  };

  const allFilterCheck : boolean = filterStates.length > 0 && filterStates.every(row => checkboxStates[row.id]);
  
  useEffect(() => {
    setfilterStates(filterDatas(Datainsert, filterValues))
  }, [filterValues]);

  useEffect(() => {
    setCheckallboxStates(allFilterCheck)
  }, [allFilterCheck]);

  useEffect(() => {
    let selectedData : {[key: string]: string }[] = []
    let selectedStore : {[key: string]: string }[] = []
    selectedStore = filterDatas(Datainsert, filterValues)
    if (itemCheck === "A") {
      selectedData = selectedStore
    } else if (itemCheck === "C") {
      selectedData = selectedStore.filter(row => checkboxStates[row.id]);
    } else {
      selectedData = selectedStore.filter(row => !checkboxStates[row.id]);
    }
    setfilterStates(selectedData);
  }, [itemCheck]);


  useEffect(() => {
    const selectedData = Datainsert.filter(row => checkboxStates[row.id]);
    onDataSelected(selectedData);
  }, [checkboxStates]);

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
    setCheckallboxStates(allFilterCheck)
  };
  const handleAllCheckboxFilterChange = () => {
    
    const isCheckedAll = !allFilterCheck;
    setCheckallboxStates(isCheckedAll);
    const newCheckboxStates: { [key: string]: boolean } = {...checkboxStates};
    filterStates.forEach(row => {
      newCheckboxStates[row.id] = isCheckedAll;
    });
    setCheckboxStates(newCheckboxStates);  
  };

  const handleItemCheck = () => {
    let nextValue;
  
    if (itemCheck === "A") {
      nextValue = "C";
    } else if (itemCheck === "C") {
      nextValue = "UC";
    } else {
      nextValue = "A";
    }
  
    setitemCheck(nextValue);
  };
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th><button className="searchBtncheckall" onClick={handleItemCheck}>{null||itemCheck}</button></th>
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
            <th>
              <input
                type="checkbox"
                checked={checkallboxStates || false}
                onChange={handleAllCheckboxFilterChange}
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
          {filterStates.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxStates[rowData.id] || false}
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
