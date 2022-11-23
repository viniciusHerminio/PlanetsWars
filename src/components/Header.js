import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchProvider';

function Header() {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        data-testid="name-filter"
      />
    </div>
  );
}

export default Header;
