import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchProvider';
import { TableContext } from '../context/TableProvider';

function Header() {
  const {
    search,
    setSearch,
    operator,
    setOperator,
    filterOperator,
    setFilterOperator,
    filterColumn,
    setFilterColumn,
    filters,
    setFilters,
    setListColumns,
    listColumns,
  } = useContext(SearchContext);

  const {
    gitRepo,
    setGitRepo,
  } = useContext(TableContext);

  const selectFilters = (option) => {
    const filtersSelect = listColumns.filter((column) => column !== option);
    setFilterColumn(filtersSelect[0]);
    return setListColumns(filtersSelect);
  };

  const filterNumber = () => {
    if (filterOperator === 'maior que') {
      const filter = gitRepo.filter((repo) => Number(
        repo[filterColumn],
      ) > Number(operator));
      setGitRepo(filter);
      setFilters([...filters, {
        filterColumn,
        filterOperator,
        operator,
      }]);
      selectFilters(filterColumn);
    } else if (filterOperator === 'menor que') {
      const filter = gitRepo.filter((repo) => Number(
        repo[filterColumn],
      ) < Number(operator));
      setGitRepo(filter);
      setFilters([...filters, {
        filterColumn,
        filterOperator,
        operator,
      }]);
      selectFilters(filterColumn);
    } else if (filterOperator === 'igual a') {
      const filter = gitRepo.filter((repo) => Number(
        repo[filterColumn],
      ) === Number(operator));
      setGitRepo(filter);
      setFilters([...filters, {
        filterColumn,
        filterOperator,
        operator,
      }]);
      selectFilters(filterColumn);
    }
  };

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        data-testid="name-filter"
      />
      <div>
        <label htmlFor="filterColumn">
          <select
            name="filterColumn"
            id="filterColumn"
            onChange={ (e) => setFilterColumn(e.target.value) }
            data-testid="column-filter"
          >
            {listColumns.map((column) => <option key={ column }>{ column }</option>)}
          </select>
        </label>
        <label htmlFor="filterOperator">
          <select
            name="filterOperator"
            id="filterOperator"
            onChange={ (e) => setFilterOperator(e.target.value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          value={ operator }
          onChange={ (e) => setOperator(e.target.value) }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ () => filterNumber() }
          data-testid="button-filter"
        >
          FILTRAR

        </button>
      </div>
      <div>
        {(filterColumn !== undefined
          ? filters.map((filter, index) => (
            <h4 key={ index }>
              {filter.filterColumn}
              {' '}
              {filter.filterOperator}
              {' '}
              {filter.operator}
            </h4>)) : '')}
      </div>
    </div>
  );
}

export default Header;
