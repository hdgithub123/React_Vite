import React, { useState } from 'react';
import './SeachboxComponent.css'; // Import CSS file for styling

interface Title {
    [key: string]: string;
}

interface SearchBoxProps {
    title: Title;
    searchKeys: string[];
    data: { [key: string]: any }[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ title, searchKeys, data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true); // State to control suggestion visibility



    const [filteredData, setFilteredData] = useState<{ [key: string]: any }[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredData = data.filter(item => {
            return searchKeys.some(key => {
                return item[key].toLowerCase().includes(searchTerm);
            });
        });

        setFilteredData(filteredData);
        setShowSuggestions(filteredData.length > 0);
    };


    return (
        <section className='search-section'>
            <div className='search-input-div'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="search-input"
                ></input>
            </div>
            {/* Render suggestions only when showSuggestions is true */}
            {showSuggestions && (
                <div className='search-result'>
                    <table >
                        <thead>
                            <tr>
                                {Object.keys(title).map((key, index) => (
                                    <th key={index}>{title[key]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    {Object.keys(title).map((key, i) => (
                                        <td key={i}>{item[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default SearchBox;
