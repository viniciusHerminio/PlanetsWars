import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SearchProvider from './context/SearchProvider';
import TableProvider from './context/TableProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <SearchProvider>
      <TableProvider>
        <App />
      </TableProvider>
    </SearchProvider>,
  );
