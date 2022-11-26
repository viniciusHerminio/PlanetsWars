import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import SearchProvider from './context/SearchProvider';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <div>
      <SearchProvider>
        <TableProvider>
          <Header />
          <Table />
        </TableProvider>
      </SearchProvider>
      ,
    </div>
  );
}
export default App;
