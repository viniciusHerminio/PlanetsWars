import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchProvider';
import { TableContext } from '../context/TableProvider';
import fecthAPI from '../services/fetchApi';

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
    disabled,
    setDisabled,
  } = useContext(SearchContext);

  const {
    gitRepo,
    setGitRepo,
  } = useContext(TableContext);

  const filterAtt = async (filtersAtt) => {
    console.log(filtersAtt);
    const fetch = await fecthAPI();
    filtersAtt.map((filter) => {
      if (filter.filterOperator === 'maior que') {
        const filterAt = fetch.filter((repo) => Number(
          repo[filter.filterColumn],
        ) > Number(filter.operator) || repo[filter.filterColumn] === 'unknown');
        return setGitRepo(filterAt);
      } if (filter.filterOperator === 'menor que') {
        const filterAt = fetch.filter((repo) => Number(
          repo[filter.filterColumn],
        ) < Number(filter.operator) || repo[filter.filterColumn] === 'unknown');
        return setGitRepo(filterAt);
      } if (filter.filterOperator === 'igual a') {
        const filterAt = fetch.filter((repo) => Number(
          repo[filter.filterColumn],
        ) === Number(filter.operator) || repo[filter.filterColumn] === 'unknown');
        return setGitRepo(filterAt);
      } return console.log('olá');
    });
  };

  useEffect(() => {
    setFilterColumn(listColumns[0]);
  }, [listColumns]);

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

  const unfilter = async (Col, filterOp, op, filtersAtt) => {
    console.log(Col);
    console.log(filterOp);
    console.log(op);
    const fetch = await fecthAPI();
    console.log(fetch);
    setGitRepo(fetch);
    filterAtt(filtersAtt);
  };

  const clearFilters = async () => {
    setFilters([]);
    const repoAtt = await fecthAPI();
    setGitRepo(repoAtt);
  };

  const buttonDelete = (
    Col,
    filterOp,
    op,
  ) => {
    console.log(Col);
    console.log(filterOp);
    console.log(op);
    setDisabled(false);
    const columnsAtt = [...listColumns, Col];
    setListColumns(columnsAtt);
    const filtersAtt = filters.filter((filter) => filter.filterColumn !== Col);
    setFilters(filtersAtt);
    unfilter(Col, filterOp, op, filtersAtt);
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
          disabled={ disabled }
        >
          FILTRAR
        </button>
        <button
          type="button"
          onClick={ () => clearFilters() }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>
      </div>
      <div>
        {(filterColumn !== undefined
          ? filters.map((filter) => (
            <div data-testid="filter" key={ filter.filterColumn }>
              <h4>
                {filter.filterColumn}
                {' '}
                {filter.filterOperator}
                {' '}
                {filter.operator}
              </h4>
              {setDisabled(false)}
              <button
                type="button"
                onClick={ () => buttonDelete(
                  filter.filterColumn,
                  filter.filterOperator,
                  filter.operator,
                ) }
              >
                Delete
              </button>
            </div>
          )) : filters.map((filterr) => (
            <div data-testid="filter" key={ filter.filterColumn }>
              <h4>
                {filterr.filterColumn}
                {' '}
                {filterr.filterOperator}
                {' '}
                {filterr.operator}
              </h4>
              {setDisabled(true)}
              <button
                type="button"
                onClick={ () => buttonDelete(
                  filterr.filterColumn,
                  filterr.filterOperator,
                  filterr.operator,
                ) }
              >
                Delete
              </button>
            </div>))
        )}
      </div>
    </div>
  );
}
export default Header;
