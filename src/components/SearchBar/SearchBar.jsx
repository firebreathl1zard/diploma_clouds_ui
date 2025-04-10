import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchButton from '../../images/search-icon.png';
import './SearchBar.css';

const SearchBar = ({ items, scrollToItem }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const filtered = items.filter(item => 
        item.className.includes('collapsed') && 
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 1) {
        scrollToItem(filtered[0].id);
      }
    }
  };

  return (
    <div className="search-container">
      <img src={SearchButton} alt="Search" className="search-icon" />
      <input
        className='search-bar'
        placeholder="Название проекта"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;