import React from 'react';
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import userEvent from '@testing-library/user-event';

const mockApi = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }))
}

describe('I am your test', () => {

  beforeEach(mockApi);
  afterEach(cleanup)

  test('Se o  título renderiza ao iniciar a página', () => {
    render(<App />)
    const title = screen.getByRole('heading', { name: 'Projeto Star Wars - Trybe', level: 1 });
    expect(title).toBeInTheDocument();
  })
  test('Se o  input de pesquisa por nome renderiza ao iniciar a página', () => {
    render(<App />)
    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();
  })
  test('Se os inputs de filtro por número e o botão filtrar estão na tela', () => {
    render(<App />)
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
    render(<App />)
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 });
    expect(loading).toBeInTheDocument();
  })
  test('Se o nome Name renderiza no thead da tabela', async () => {
    render(<App />)
    const namethead = await screen.findByText('Name');
    expect(namethead).toBeInTheDocument();
  })
  test('Se o nome Rotation Period renderiza no thead da tabela', async () => {
    render(<App />)
    const rotationthead = await screen.findByText('Rotation Period');
    expect(rotationthead).toBeInTheDocument();
  })
  test('Se o nome Orbital Period renderiza no thead da tabela', async () => {
    render(<App />)
    const orbitalthead = await screen.findByText('Orbital Period');
    expect(orbitalthead).toBeInTheDocument();
  })
  test('Se o nome Diameter renderiza no thead da tabela', async () => {
    render(<App />)
    const diameterthead = await screen.findByText('Diameter');
    expect(diameterthead).toBeInTheDocument();
  })
  test('Se o nome Climate renderiza no thead da tabela', async () => {
    render(<App />)
    const climatethead = await screen.findByText('Climate');
    expect(climatethead).toBeInTheDocument();
  })
  test('Se o nome Gravity renderiza no thead da tabela', async () => {
    render(<App />)
    const gravitythead = await screen.findByText('Gravity');
    expect(gravitythead).toBeInTheDocument();
  })
  test('Se o nome Terrain renderiza no thead da tabela', async () => {
    render(<App />)
    const terrainthead = await screen.findByText('Terrain');
    expect(terrainthead).toBeInTheDocument();
  })
  test('Se o nome Orbital Period renderiza no thead da tabela', async () => {
    render(<App />)
    const orbitalthead = await screen.findByText('Orbital Period');
    expect(orbitalthead).toBeInTheDocument();
  })
  test('Se o nome Surface Water renderiza no thead da tabela', async () => {
    render(<App />)
    const surfacethead = await screen.findByText('Surface Water');
    expect(surfacethead).toBeInTheDocument();
  })
  test('Se o nome Population renderiza no thead da tabela', async () => {
    render(<App />)
    const populationthead = await screen.findByText('Population');
    expect(populationthead).toBeInTheDocument();
  })
  test('Se o nome Films renderiza no thead da tabela', async () => {
    render(<App />)
    const filmsthead = await screen.findByText('Films');
    expect(filmsthead).toBeInTheDocument();
  })
  test('Se o nome Created renderiza no thead da tabela', async () => {
    render(<App />)
    const createdthead = await screen.findByText('Created');
    expect(createdthead).toBeInTheDocument();
  })
  test('Se o nome Edited renderiza no thead da tabela', async () => {
    render(<App />)
    const editedthead = await screen.findByText('Edited');
    expect(editedthead).toBeInTheDocument();
  })
  test('Se todos os componentes da tabela são renderizaados', async () => {
    render(<App />)
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    const mockResults = testData.results;
    waitForElementToBeRemoved(loading)
    mockResults.map(async (mockPlanet) => {
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
        rotation_period,
        orbital_period,
        surface_water,
      } = mockPlanet;

      const nameElement = await screen.findByText(name)
      expect(name).toEqual(nameElement.innerHTML);
      const climateElement = await screen.findByText(climate)
      expect(climate).toEqual(climateElement.innerHTML);
      const gravityElement = await screen.findByText(gravity)
      expect(gravity).toEqual(gravityElement.innerHTML);
      const terrainElement = await screen.findByText(terrain)
      expect(terrain).toEqual(terrainElement.innerHTML);
      const populationElement = await screen.findByText(population)
      expect(population).toEqual(populationElement.innerHTML);
      const filmsElement = await screen.findByText(films)
      expect(films).toEqual(filmsElement.innerHTML);
      const createdElement = await screen.findByText(created)
      expect(created).toEqual(createdElement.innerHTML);
      const editedElement = await screen.findByText(edited)
      expect(edited).toEqual(editedElement.innerHTML);
      const urlElement = await screen.findByText(url)
      expect(url).toEqual(urlElement.innerHTML);
      const rotation_periodElement = await screen.findByText(rotation_period)
      expect(rotation_period).toEqual(rotation_periodElement.innerHTML);
      const orbital_periodElement = await screen.findByText(orbital_period)
      expect(orbital_period).toEqual(orbital_periodElement.innerHTML);
      const surface_waterElement = await screen.findByText(surface_water)
      expect(surface_water).toEqual(surface_waterElement.innerHTML);
      const diameterElement = await screen.findByText(diameter)
      expect(diameter).toEqual(diameterElement.innerHTML);
    })
  })
  test('Se ao filtrar pelo nome o componente correto é renderizado', async () => {
    render(<App />)
    const loading = screen.getByRole('heading', { name: 'Loading...', level: 1 })
    waitForElementToBeRemoved(loading)
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 't')
    expect(inputName).toHaveValue('t');
    const nameCorrect = await screen.findByText('Tatooine')
    expect(nameCorrect).toBeInTheDocument();
  })
  test('Se ao filtrar pelo numero o componente correto é renderizado', async () => {
    render(<App />)
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
    render(<App />)
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
    render(<App />)
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



});
