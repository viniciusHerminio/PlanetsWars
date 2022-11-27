import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');
  const [operator, setOperator] = useState(0);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filters, setFilters] = useState([]);
  const [listColumns, setListColumns] = useState(
    [
      'population',
      'diameter',
      'orbital_period',
      'rotation_period',
      'surface_water',
    ],
  );
  const [disabled, setDisabled] = useState(false);

  const values = useMemo(() => ({
    search,
    setSearch,
    operator,
    setOperator,
    filterColumn,
    setFilterColumn,
    filterOperator,
    setFilterOperator,
    filters,
    setFilters,
    listColumns,
    setListColumns,
    disabled,
    setDisabled,
  }), [
    search,
    operator,
    filterColumn,
    filterOperator,
    filters,
    listColumns,
    disabled,
  ]);

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
