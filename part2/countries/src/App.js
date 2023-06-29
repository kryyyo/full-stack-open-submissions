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
      return (
        <div>
          <h1>{country.name.common}</h1>
          <div>capital {country.capital.length ? country.capital.join(',') : null}</div>
          <div>area {country.area}</div>

          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
          </ul>

          <img alt={country.flags.alt} src={country.flags.png} />
        </div>
      )
    } else if (filtered.length > 10) {
      return (<div>Too many matches, specify another filter</div>)
    } else if (filtered.length > 1) {
      return (
        filtered.map(country =>
          <div key={country.name.official}>{country.name.common}</div>
        )
      )
    } else return null
  }

  const handleChange = (e) => setSearchVal(e.target.value);

  return (
    <>
    <div>
      find countries
      <input value={searchVal} onChange={handleChange} />
      {getList()}
    </div>
    
    </>
  )
}

export default App;
