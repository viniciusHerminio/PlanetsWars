import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');
  const [operator, setOperator] = useState(0);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');

  const values = useMemo(() => ({
    search,
    setSearch,
    operator,
    setOperator,
    filterColumn,
    setFilterColumn,
    filterOperator,
    setFilterOperator,
  }), [search, operator, filterColumn, filterOperator]);

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
