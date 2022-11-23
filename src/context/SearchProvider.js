import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');

  const values = {
    search,
    setSearch,
  };

  return (
    <SearchContext.Provider value={ values }>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
