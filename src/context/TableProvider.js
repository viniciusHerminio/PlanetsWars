import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import fecthAPI from '../services/fetchApi';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [gitRepo, setGitRepo] = useState([]);

  const fetchData = async () => {
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

  const values = {
    isLoading,
    fetchData,
    gitRepo,
  };

  return (
    <TableContext.Provider value={ values }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
