const fecthAPI = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const result = await response.json();
  return result;
};

export default fecthAPI;
