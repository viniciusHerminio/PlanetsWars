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
  } = useContext(SearchContext);

  const {
    gitRepo,
    setRepoFiltredNumer,
    setIsFiltred,
  } = useContext(TableContext);

  const filterNumber = () => {
    console.log('chamou');
    if (filterOperator === 'maior que') {
      const filter = gitRepo.filter((repo) => Number(
        repo[filterColumn],
      ) > Number(operator));
      console.log(filter);
      setRepoFiltredNumer(filter);
      console.log('maior que');
    } else if (filterOperator === 'menor que') {
      const filter = gitRepo.filter((repo) => Number(
        repo[filterColumn],
      ) < Number(operator));
      setRepoFiltredNumer(filter);
      console.log('menor que');
    } else if (filterOperator === 'igual a') {
      const filter = gitRepo.filter((repo) => Number(
        repo[filterColumn],
      ) === Number(operator));
      setRepoFiltredNumer(filter);
      console.log('igual a');
    }
    setIsFiltred(true);
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
    </div>
  );
}

export default Header;
