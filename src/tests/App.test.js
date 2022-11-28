import React from 'react';
import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import userEvent from '@testing-library/user-event';
import SearchProvider, { SearchContext } from '../context/SearchProvider';
import TableProvider from '../context/TableProvider';
import { act } from 'react-dom/test-utils';

const mockApi = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }))
}

describe('I am your test', () => {

  beforeEach(mockApi);
  afterEach(cleanup)

  test('Se o  título renderiza ao iniciar a página', () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const title = screen.getByRole('heading', { name: 'Projeto Star Wars - Trybe', level: 1 });
    expect(title).toBeInTheDocument();
  })
  test('Se o  input de pesquisa por nome renderiza ao iniciar a página', () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();
  })
  test('Se os inputs de filtro por número e o botão filtrar estão na tela', () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const selectCategoryFilter = screen.getByTestId('column-filter');
    expect(selectCategoryFilter).toBeInTheDocument();
    const selectOperatorFilter = screen.getByTestId('comparison-filter');
    expect(selectOperatorFilter).toBeInTheDocument();
    const selectNumberFilter = screen.getByTestId('value-filter');
    expect(selectNumberFilter).toBeInTheDocument();
    const buttonFilter = screen.getByRole('button', { name: 'FILTRAR' });
    expect(buttonFilter).toBeInTheDocument();
  })
  test('Se o nome loading renderiza ao iniciar a página enquanto a requisição a API é feita', () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 });
    expect(loading).toBeInTheDocument();
  })
  test('Se o nome Name renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const namethead = await screen.findByText('Name');
    expect(namethead).toBeInTheDocument();
  })
  test('Se o nome Rotation Period renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const rotationthead = await screen.findByText('Rotation Period');
    expect(rotationthead).toBeInTheDocument();
  })
  test('Se o nome Orbital Period renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const orbitalthead = await screen.findByText('Orbital Period');
    expect(orbitalthead).toBeInTheDocument();
  })
  test('Se o nome Diameter renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const diameterthead = await screen.findByText('Diameter');
    expect(diameterthead).toBeInTheDocument();
  })
  test('Se o nome Climate renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const climatethead = await screen.findByText('Climate');
    expect(climatethead).toBeInTheDocument();
  })
  test('Se o nome Gravity renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const gravitythead = await screen.findByText('Gravity');
    expect(gravitythead).toBeInTheDocument();
  })
  test('Se o nome Terrain renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const terrainthead = await screen.findByText('Terrain');
    expect(terrainthead).toBeInTheDocument();
  })
  test('Se o nome Orbital Period renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const orbitalthead = await screen.findByText('Orbital Period');
    expect(orbitalthead).toBeInTheDocument();
  })
  test('Se o nome Surface Water renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const surfacethead = await screen.findByText('Surface Water');
    expect(surfacethead).toBeInTheDocument();
  })
  test('Se o nome Population renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const populationthead = await screen.findByText('Population');
    expect(populationthead).toBeInTheDocument();
  })
  test('Se o nome Films renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const filmsthead = await screen.findByText('Films');
    expect(filmsthead).toBeInTheDocument();
  })
  test('Se o nome Created renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const createdthead = await screen.findByText('Created');
    expect(createdthead).toBeInTheDocument();
  })
  test('Se o nome Edited renderiza no thead da tabela', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const editedthead = await screen.findByText('Edited');
    expect(editedthead).toBeInTheDocument();
  })
  test('Se todos os componentes da tabela são renderizaados', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    const mockResults = testData.results;
    waitForElementToBeRemoved(loading)
    mockResults.map(async (mockPlanet) => {
      const {
        name,
      } = mockPlanet;

      const nameElement = await screen.findByText(name)
      expect(name).toEqual(nameElement.innerHTML);
    })
  })
  test('Se ao filtrar pelo nome o componente correto é renderizado', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 't')
    expect(inputName).toHaveValue('t');
    const nameCorrect = await screen.findByText('Tatooine')
    expect(nameCorrect).toBeInTheDocument();
  })
  test('Se ao filtrar pelo numero o componente correto é renderizado', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const selectCategoryFilter = screen.getByTestId('column-filter');
    const selectOperatorFilter = screen.getByTestId('comparison-filter');
    const selectNumberFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', { name: 'FILTRAR' });
    userEvent.selectOptions(selectCategoryFilter, ['population'])
    userEvent.type(selectNumberFilter, 2000000000)
    userEvent.selectOptions(selectOperatorFilter, ['igual a'])
    userEvent.click(buttonFilter)
    const nameCorrect = await screen.findByText('Alderaan')
    expect(nameCorrect).toBeInTheDocument();
  })
  test('Se ao filtrar pelo numero o componente correto é renderizado', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const selectCategoryFilter = screen.getByTestId('column-filter');
    const selectOperatorFilter = screen.getByTestId('comparison-filter');
    const selectNumberFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', { name: 'FILTRAR' });
    userEvent.selectOptions(selectCategoryFilter, ['population'])
    userEvent.clear(selectNumberFilter)
    userEvent.type(selectNumberFilter, 2000000000)
    userEvent.selectOptions(selectOperatorFilter, ['maior que'])
    userEvent.click(buttonFilter)
    const nameCorrect = await screen.findByText('Alderaan')
    expect(nameCorrect).toBeInTheDocument();
  })
  test('Se ao filtrar pelo numero o componente correto é renderizado', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const selectCategoryFilter = screen.getByTestId('column-filter');
    const selectOperatorFilter = screen.getByTestId('comparison-filter');
    const selectNumberFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', { name: 'FILTRAR' });
    userEvent.type(selectCategoryFilter, 'population')
    userEvent.type(selectNumberFilter, 2000000000)
    userEvent.selectOptions(selectOperatorFilter, ['igual a']
    )
    userEvent.click(buttonFilter)
    const nameCorrect = await screen.findByText('Alderaan')
    expect(nameCorrect).toBeInTheDocument();
  })
  test('Se ao apagar o filtro os componentes filtrados são restaurados', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const selectCategoryFilter = screen.getByTestId('column-filter');
    const selectOperatorFilter = screen.getByTestId('comparison-filter');
    const selectNumberFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', { name: 'FILTRAR' });
    userEvent.type(selectCategoryFilter, 'population')
    userEvent.type(selectNumberFilter, 2000000000)
    userEvent.selectOptions(selectOperatorFilter, ['igual a']
    )
    userEvent.click(buttonFilter)
    const nameCorrect = await screen.findByText('Alderaan')
    expect(nameCorrect).toBeInTheDocument();
    const btnDelete = screen.getByRole('button', { name: 'Delete' })
    userEvent.click(btnDelete);
    const tatooine = screen.getByText('Tatooine');
    expect(tatooine).toBeInTheDocument();
  })
  test('Se ao apagar todos os filtros os componentes filtrados são restaurados', async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const selectCategoryFilter = screen.getByTestId('column-filter');
    const selectOperatorFilter = screen.getByTestId('comparison-filter');
    const selectNumberFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', { name: 'FILTRAR' });
    userEvent.type(selectCategoryFilter, 'population')
    userEvent.type(selectNumberFilter, 2000000000)
    userEvent.selectOptions(selectOperatorFilter, ['igual a']
    )
    userEvent.click(buttonFilter)
    const nameCorrect = await screen.findByText('Alderaan')
    expect(nameCorrect).toBeInTheDocument();
    const btnDelete = screen.getByRole('button', { name: 'Remover Filtros' })
    userEvent.click(btnDelete);
    const numbers = await screen.findAllByText(/swapi/i);
    expect(numbers.length).toBe(20);
  })
  test("Se os filtros maior que, menor que e igual a funcionam perfeitamente", async () => {
    render(
      <SearchProvider>
        <TableProvider>
          <App />
        </TableProvider>
      </SearchProvider>
    )
    const filterOperator = await screen.findByTestId('comparison-filter');
    const btnFiltrar = await screen.findByRole('button', { name: "FILTRAR" });
    userEvent.click(btnFiltrar);
    userEvent.click(btnFiltrar);
    userEvent.click(btnFiltrar);
    userEvent.click(btnFiltrar);
    userEvent.click(btnFiltrar);
    const buttons = await screen.findAllByRole('button', { name: 'Delete' });
    expect(buttons).toHaveLength(5);
    expect(btnFiltrar).toBeDisabled();
    buttons.map((button) => {
      userEvent.click(button);
    })
    expect(btnFiltrar).toBeEnabled();
    userEvent.selectOptions(filterOperator, 'menor que');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'menor que');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'menor que');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'menor que');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'menor que');
    userEvent.click(btnFiltrar);
    expect(btnFiltrar).toBeDisabled();
    const buttons2 = await screen.findAllByRole('button', { name: 'Delete' });
    expect(buttons2).toHaveLength(5);
    buttons2.map((button) => {
      userEvent.click(button);
    })
    expect(btnFiltrar).toBeEnabled();
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.click(btnFiltrar);
    userEvent.selectOptions(filterOperator, 'igual a');
    userEvent.click(btnFiltrar);
    expect(btnFiltrar).toBeDisabled();
    const buttons3 = await screen.findAllByRole('button', { name: 'Delete' });
    expect(buttons3).toHaveLength(5);
    buttons3.map((button) => {
      userEvent.click(button);
    })
    expect(btnFiltrar).toBeEnabled();
  })
})
