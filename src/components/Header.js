import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchProvider';
import { TableContext } from '../context/TableProvider';
import fecthAPI from '../services/fetchApi';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const unfilter = async (filtersAtt) => {
    const fetch = await fecthAPI();
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
  ) => {
    setDisabled(false);
    const columnsAtt = [...listColumns, Col];
    setListColumns(columnsAtt);
    const filtersAtt = filters.filter((filter) => filter.filterColumn !== Col);
    setFilters(filtersAtt);
    unfilter(filtersAtt);
  };

  return (
    <div className="p-5">
      <div className="d-flex align-items-center flex-column mb-3">
        <h1>PlanetsWars</h1>
        <input
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          data-testid="name-filter"
          className="form-control"
        />
      </div>
      <div className="d-flex input-group">
        <label htmlFor="filterColumn" className="m-1">
          <select
            name="filterColumn"
            id="filterColumn"
            onChange={ (e) => setFilterColumn(e.target.value) }
            data-testid="column-filter"
            className="form-select"
          >
            {listColumns.map((column) => <option key={ column }>{ column }</option>)}
          </select>
        </label>
        <label htmlFor="filterOperator" className="m-1">
          <select
            name="filterOperator"
            id="filterOperator"
            onChange={ (e) => setFilterOperator(e.target.value) }
            data-testid="comparison-filter"
            className="form-select"
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
          className="m-1 form-control"
        />
        <button
          type="button"
          onClick={ () => filterNumber() }
          data-testid="button-filter"
          disabled={ disabled }
          className="m-1 btn btn-primary"
        >
          FILTRAR
        </button>
        <button
          type="button"
          onClick={ () => clearFilters() }
          data-testid="button-remove-filters"
          className="m-1 btn btn-danger"
        >
          Remover Filtros
        </button>
      </div>
      <div>
        {(filterColumn !== undefined
          ? filters.map((filter) => (
            <div
              data-testid="filter"
              key={ filter.filterColumn }
              className="d-flex mt-4"
            >
              <h4 className="me-3">
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
                ) }
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          )) : filters.map((filterr) => (
            <div
              data-testid="filter"
              key={ filterr.filterColumn }
              className="d-flex mt-4"
            >
              <h4 className="me-3">
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
                ) }
                className="btn btn-danger"
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
