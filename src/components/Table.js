import React, { useEffect, useState } from 'react';
import fecthAPI from '../services/fetchApi';

function Table() {
  const [isLoading, setIsLoading] = useState(false);
  const [gitRepo, setGitRepo] = useState([]);

  const fetchData = async () => {
    console.log('montou!');
    try {
      setIsLoading(true);
      const result = await fecthAPI();
      setGitRepo(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        {gitRepo.length === 0
          ? '' : (gitRepo.results).map((planet, index) => {
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
