import Country from './components/country';
import CountryRow from './components/country-row';
import countriesSrvc from './services/countries'
import { useEffect, useState } from 'react';

const App = () => {
  const [searchVal, setSearchVal] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    countriesSrvc
      .getAll()
      .then(countries => setCountries(countries));
  }, [])

  useEffect(() => {
    const trimmedSearch = searchVal.toLowerCase().trim();

    if (trimmedSearch !== '') {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(trimmedSearch) ||
        country.name.official.toLowerCase().includes(trimmedSearch));
      setFiltered(filtered);
    } else {
      setFiltered([]);
    }
  }, [countries, searchVal])

  const getList = () => {
    if (filtered.length === 1) {
      const country = filtered[0];
      return (<Country country={country} />)
    } else if (filtered.length > 10) {
      return (<div>Too many matches, specify another filter</div>)
    } else if (filtered.length > 1) {
      return (
        filtered.map(country => <CountryRow key={country.name.common} country={country} />)
      )
    } else return null
  }

  const handleChange = (e) => setSearchVal(e.target.value);

  return (
    <div>
      find countries
      <input value={searchVal} onChange={handleChange} />
      {getList()}
    </div>
  )
}

export default App;
