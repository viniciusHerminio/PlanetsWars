import React, { useEffect, useState } from 'react';
import fecthAPI from '../services/fetchApi';

function Table() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    console.log('montou!');
    try {
      setIsLoading(true);
      const result = await fecthAPI();
      console.log(result);
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
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Table;
