import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import fecthAPI from '../services/fetchApi';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [gitRepo, setGitRepo] = useState([]);
  const [repoFiltredNumber, setRepoFiltredNumer] = useState([]);
  const [isFiltred, setIsFiltred] = useState(false);

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

  const values = useMemo(() => ({
    isLoading,
    fetchData,
    gitRepo,
    setRepoFiltredNumer,
    repoFiltredNumber,
    isFiltred,
    setIsFiltred,
    setGitRepo,
  }), [isLoading, gitRepo, repoFiltredNumber, isFiltred]);

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
