import React, { useContext, useEffect } from 'react';
import { TableContext } from '../context/TableProvider';
import { SearchContext } from '../context/SearchProvider';

function Table() {
  const {
    isLoading,
    gitRepo,
    fetchData,
  } = useContext(TableContext);
  const { search } = useContext(SearchContext);

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {(gitRepo).filter((repo) => repo.name
          .includes(search)).map((planet, index) => {
          const {
            name,
            diameter,
            climate,
            gravity,
            terrain,
            population,
            films,
            created,
            edited,
            url,
          } = planet;
          return (
            <tbody key={ index }>
              <tr>
                <td>{ name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ diameter }</td>
                <td>{ climate }</td>
                <td>{ gravity }</td>
                <td>{ terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ population }</td>
                <td>{ films }</td>
                <td>{ created }</td>
                <td>{ edited }</td>
                <td>{ url }</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Table;
